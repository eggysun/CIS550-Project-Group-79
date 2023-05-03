const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

/******************
 * ROUTES FOR QUERIES *
 ******************/

// Route 1: GET /search_restaurants  
const search_restaurants = async function(req, res) {
  // This query enables the application to use the values inputs by users to filter out all
  // the restaurants / locations that satisfies the criteria  
  
  const postal_code_upper = req.query.postal_code_upper ?? 19155;
  const postal_code_lower = req.query.postal_code_lower ?? 19101;
  const stars_upper = req.query.stars_upper ?? 5;
  const stars_lower = req.query.stars_lower ?? 0;
  const latitude_lower = req.query.latitude_lower ?? 38;
  const latitude_upper = req.query.latitude_upper ?? 41;
  const longitude_lower = req.query.longitude_lower ?? -75;
  const longitude_upper = req.query.longitude_upper ?? -76;
  const review_count_lower = req.query.review_count_lower ?? 0;
  const review_count_upper = req.query.review_count_upper ?? 0;
  const name = req.query.name ?? '';
  const cat = req.query.categories ?? '';

  connection.query(`
    SELECT *
    FROM Business
    WHERE name LIKE '%${name}%' AND
    postal_code <= ${postal_code_upper} AND postal_code >= ${postal_code_lower} AND
    stars <= ${stars_upper} AND stars >= ${stars_lower} AND
    latitude <= ${latitude_upper} AND latitude >= ${latitude_lower} AND
    longitude <= ${longitude_upper} AND longitude >= ${longitude_lower} AND
    review_count <= ${review_count_upper} AND review_count >= ${review_count_lower} AND
    categories LIKE '%${cat}%'
    ORDER BY name ASC;
  `, (err, data) => {
    if (err || data.length === 0) {
    res.json({});
    } else {
    res.json(data);
    }
    });
  }
  

// Route 2: GET /location_specific_search
  // In this query, we used simple SELECT-FROM-WHERE functions of MySQL 
  // and we also illustrated the function of ORDER-BY and LIMIT.

const location_specific_search = async function(req, res) {
  const postal_code = req.query.postal_code ?? 19104;
  connection.query(`
    SELECT name, stars, address, postal_code
    FROM Business
    WHERE postal_code = ${postal_code}
    ORDER BY stars DESC
    LIMIT 5;
    `, (err, data) => {
    if (err || data.length === 0) {
    res.json({});
    } else {
    res.json(data);
    }
  });
}


// Route 3: GET /friends_review/:user_id
  // Replace <user_id> with the actual ID of the user. This query will 
  // display the restaurants that the user's friends have reviewed and 
  // sort them by their friend's review star rating in descending order.
const friends_review = async function(req, res) {
  var user_id = req.params.user_id
  connection.query(`
    SELECT DISTINCT b.name, b.address, b.city, b.state, b.postal_code, r.stars, f.friends AS friend_id
    FROM User u
    JOIN FriendsOf f ON u.user_id = f.user_id
    JOIN Reviews r ON f.friends = r.user_id
    JOIN Business b ON r.business_id = b.business_id
    WHERE u.user_id = '${user_id}'
    ORDER BY r.stars DESC;
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
    
}

// Route 4: GET /similar_taste/:user_id

const similar_taste = async function(req, res) {
  var user_id = req.params.user_id ?? '' // Getting the specific user_id
  var query = `
  WITH temp AS (
    SELECT r.business_id AS business_id, r.stars AS stars
      FROM Reviews r
      JOIN User u ON u.user_id = r.user_id
      JOIN Business b ON r.business_id = b.business_id
      WHERE u.user_id LIKE '%${user_id}%'
  )
  SELECT u.name, b.name,r.stars
  FROM temp t JOIN Reviews r ON r.business_id = t.business_id
  JOIN Business b ON r.business_id = b.business_id
  JOIN User u ON r.user_id = u.user_id
  WHERE r.stars = t.stars + 1 OR r.stars = t.stars - 1
  ORDER BY r.stars DESC
  `;

  connection.query(query, function (err, data){
  if (err) {
    console.log(err);
    res.json({});
  } else {
    /* console.log(data);*/
    res.json(data);
  }
})
}

// Route 5: GET /average_rating/:user_id
const average_rating = async function(req, res) {
  // In this query, I used the GROUP BY-HAVING function to get the average stars of a specific given user_id
  var user_id = req.params.user_id; // Getting the specific user_id

  var query = `
  SELECT a.user_id AS user_id, a.name AS name, AVG(b.stars) AS average_rating
  FROM User a LEFT JOIN Reviews b ON a.user_id = b.user_id
  GROUP BY a.user_id, a.name
  HAVING a.user_id LIKE '${user_id}';
  `;
    connection.query(query, function (err, data){
    if (err) {
      res.json({});
    } else {
      res.json(data[0]);
    }   
})
}

// Route 6: GET /closest_restaurant/:business_id
const closest_restaurant = async function(req, res) {
var business_id = req.params.business_id;
const page = req.query.page;
const page_size = req.query.page_size ?? 10;
const num = (page - 1) * page_size;

if (!page) {
  connection.query(`
  WITH temp AS (
    SELECT latitude, longitude
    FROM Business
    WHERE business_id LIKE '${business_id}'
  )
  SELECT b.name AS name, b.business_id AS business_id, b.address, b.city, b.state, b.postal_code AS postal_code, b.review_count, b.stars AS stars, b.latitude AS latitude, b.longitude AS longitude,
  ROUND((6371 * acos(sin((SELECT latitude FROM temp)*0.01745)*sin(b.latitude*0.01745)+cos(b.latitude*0.01745)* cos((SELECT latitude FROM temp)*0.01745)*cos((-b.longitude + (SELECT longitude FROM temp))*0.01745)))*1000,2) AS distance
  FROM Business b
  ORDER BY distance ASC
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([{"name":"","business_id":"","address":"","city":"","state":"","postal_code":"","review_count":"","stars":"","latitude":"","longitude":"","distance":""}]);
    } else {
      res.json(data);
    }
  });
} else {
  connection.query(`
  WITH temp AS (
    SELECT latitude, longitude
    FROM Business
    WHERE business_id LIKE '${business_id}'
  )
  SELECT b.name AS name, b.business_id AS business_id, b.address, b.city, b.state, b.postal_code AS postal_code, b.review_count, b.stars AS stars, b.latitude AS latitude, b.longitude AS longitude,
  ROUND((6371 * acos(sin((SELECT latitude FROM temp)*0.01745)*sin(b.latitude*0.01745)+cos(b.latitude*0.01745)* cos((SELECT latitude FROM temp)*0.01745)*cos((-b.longitude + (SELECT longitude FROM temp))*0.01745)))*1000,2) AS distance
  FROM Business b
  ORDER BY distance ASC
  LIMIT ${num}, ${page_size}
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json([{"name":"","business_id":"","address":"","city":"","state":"","postal_code":"","review_count":"","stars":"","latitude":"","longitude":"","distance":""}]);
    } else {
      res.json(data);
    }
  });
}
}


// Route 7: GET /similar_restaurant/:restaurant_name
const similar_restaurant = async function(req, res) {
  // Description: Retrieves a list of businesses similar to the specified business based on star rating and review count.
  const business_id = req.params.business_id ?? '';
  const page = req.query.page;
  const page_size = req.query.page_size ?? 10;
  const num = (page - 1) * page_size;


  if (!page) {
    connection.query(`
    SELECT b1.business_id, b1.name, b2.name as similar_name, b2.business_id AS similar_business_id, ROUND((0.3 * ABS(b1.stars - b2.stars) + 0.7 * (1 - (ABS(b1.review_count - b2.review_count) / (b1.review_count + b2.review_count)))),2) AS similarity_score
  FROM Business b1
  JOIN Business b2 ON b1.business_id <> b2.business_id
  WHERE b1.business_id = '${business_id}'
  ORDER BY similarity_score DESC
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([{"business_id":"","name":"","similar_name":"","similar_business_id":"","similarity_score":0}]);
      } else {
        res.json(data);
      }
    });
  } else {
    connection.query(`
    SELECT b1.business_id, b1.name, b2.name as similar_name, b2.business_id AS similar_business_id, ROUND((0.3 * ABS(b1.stars - b2.stars) + 0.7 * (1 - (ABS(b1.review_count - b2.review_count) / (b1.review_count + b2.review_count)))),2) AS similarity_score
    FROM Business b1
    JOIN Business b2 ON b1.business_id <> b2.business_id
    WHERE b1.business_id = '${business_id}'
    ORDER BY similarity_score DESC
    LIMIT ${num}, ${page_size}
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([{"business_id":"","name":"","similar_name":"","similar_business_id":"","similarity_score":""}]);
      } else {
        res.json(data);
      }
    });
  }
}


// Route 8: GET /specific_cuisine/:type
// Replace <cuisine_type> with the actual cuisine type of the user. In this query, 
// we selected all the information of business such that the business_id is the set of business_id labeled with the cuisine_type inputted. 
const specific_cuisine = async function(req, res) {
  const cuisine_type = req.params.type ?? '';

  // Execute the SQL query to retrieve the businesses by cuisine type
  connection.query(`
    SELECT name, address, city, state, postal_code, review_count, stars, categories
    FROM Business
    WHERE business_id IN (
        SELECT business_id
        FROM Business
        WHERE categories LIKE '%Restaurant%' AND categories LIKE '%${cuisine_type}%'
    )
    ORDER BY stars DESC;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.status(404).json({ error: "No businesses found for this cuisine type" });
    } else {
      res.json({ businesses: data });
    }
  });

}



// Route 9: GET /top_restaurant
const top_restaurant = async function(req, res) {
  const page = req.query.page;
  const page_size = req.query.page_size ?? 10;
  const num = (page - 1) * page_size;

  if (!page) {
    connection.query(`
    SELECT b.name AS business_name, r.stars AS Stars, b.business_id AS business_id, b.postal_code AS zip
    FROM Business b JOIN Reviews r ON b.business_id = r.business_id
    ORDER BY r.stars DESC
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  } else {
    connection.query(`
    SELECT b.name AS business_name, r.stars AS Stars, b.business_id AS business_id, b.postal_code AS zip
    FROM Business b JOIN Reviews r ON b.business_id = r.business_id
    ORDER BY r.stars DESC
    LIMIT ${num}, ${page_size}
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    });
  }
}


// Route 10: GET /friends/:user_id
//  In this query, I created a temp table to store all the friends of the given user. 
//  Then, the query will find the a person's Friends' Friend
const friends = async function(req, res) {
  const user_id = req.params.user_id;
  const page = req.query.page;
  const page_size = req.query.page_size ?? 10;
  const num = (page - 1) * page_size;


  if (!page) {
    connection.query(`
    WITH temp AS (
      SELECT friends
      FROM FriendsOf
      WHERE user_id = '${user_id}'
    )
    SELECT a.friends AS Friends_id, f.friends AS Friendss_id
    FROM temp a JOIN FriendsOf f ON a.friends = f.user_id;
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([{"Friends_id":"","Friendss_id":""}]);
      } else {
        res.json(data);
      }
    });
  } else {
    connection.query(`
    WITH temp AS (
      SELECT friends
      FROM FriendsOf
      WHERE user_id = '${user_id}'
    )
    SELECT a.friends AS Friends_id, f.friends AS Friendss_id
    FROM temp a JOIN FriendsOf f ON a.friends = f.user_id
    LIMIT ${num}, ${page_size}
    `, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([{"Friends_id":"","Friendss_id":""}]);
      } else {
        res.json(data);
      }
    });
  }
}

// Route 11: GET /random
//  In this query, I created a temp table to store all the friends of the given user. 
//  Then, I selected all the friends in the temp table that has a reviews of a business_id 
//  in the set of business_id that the given user has reviewed.
const random = async function(req, res) {
  connection.query(`
  SELECT *
  FROM Business
  ORDER BY RAND()
  LIMIT 1
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({
        business_id: data[0].business_id,
        name: data[0].name
      });
    }
  });
}

// Route 12: GET /restaurant/:business_id
const restaurant = async function(req, res) {
  // TODO (TASK 4): implement a route that given a song_id, returns all information about the song
  // Most of the code is already written for you, you just need to fill in the query
  connection.query(`
  SELECT *
  FROM Business
  WHERE business_id = '${req.params.business_id}'
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}

module.exports = {
  search_restaurants,
  location_specific_search,
  friends_review,
  similar_taste,
  average_rating,
  closest_restaurant,
  similar_restaurant,
  specific_cuisine,
  top_restaurant,
  friends,
  random,
  restaurant
}