const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js

app.get('/search_restaurants', routes.search_restaurants) //
app.get('/location_specific_search', routes.location_specific_search)
app.get('/friends_review/:user_id', routes.friends_review)
app.get('/similar_taste/:user_id', routes.similar_taste)
<<<<<<< HEAD
app.get('/average_rating/:user_id', routes.average_rating) //
=======
app.get('/average_rating/:user_id', routes.average_rating)
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
app.get('/closest_restaurant/:business_id', routes.closest_restaurant) //
app.get('/similar_restaurant/:business_id', routes.similar_restaurant) //
app.get('/specific_cuisine/:type', routes.specific_cuisine)
app.get('/top_restaurant', routes.top_restaurant) //
app.get('/friends/:user_id', routes.friends) //
app.get('/random', routes.random) //
app.get('/restaurant/:business_id', routes.restaurant) //







app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
