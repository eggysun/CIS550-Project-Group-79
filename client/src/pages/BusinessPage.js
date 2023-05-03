import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Button, Container, Grid, Link, Slider, TextField, Divider} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RestaurantCard from '../components/RestaurantCard';
import LazyTable from '../components/LazyTable';
import Banner2 from '../components/Banner2';
import React from 'react';
import photo12 from '../components/12.jpeg';
=======
import { Button, Container, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import RestaurantCard from '../components/RestaurantCard';
import LazyTable from '../components/LazyTable';
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
const config = require('../config.json');

export default function RestaurantPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedResId, setSelectedResId] = useState(null);

  const [restaurant_name, setName] = useState('');
  const [restaurant_id, setRestaurant_id] = useState('');
  const [categories, setCategories] = useState('');
  const [stars, setStars] = useState([0, 5]);
  const [postal_code, setPostal_code] = useState([19101, 19155]);
  const [latitude, setLatitude] = useState([38, 41]);
  const [longitude, setLongitude] = useState([-76, -75]);
  const [review_count, setReview_count] = useState([0, 300])

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/search_restaurants`)
      .then(res => res.json())
      .then(resJson => {
        const resWithId = resJson.map((business) => ({ id: business.business_id, ...business }));
        setData(resWithId);
      });
  }, []);

  const search1 = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search_restaurants?name=${restaurant_name}&categories=${categories}` +
      `&postal_code_lower=${postal_code[0]}&postal_code_upper=${postal_code[1]}` +
      `&stars_lower=${stars[0]}&stars_upper=${stars[1]}` +
      `&latitude_lower=${latitude[0]}&latitude_upper=${latitude[1]}` +
      `&longitude_lower=${longitude[0]}&longitude_upper=${longitude[1]}` + 
      `&review_count_lower=${review_count[0]}&review_count_upper=${review_count[1]}`
    )
      .then(res => res.json())
      .then(resJson => {
        const resWithId = resJson.map((business) => ({ id: business.business_id, ...business }));
        setData(resWithId);
      });
  }
  // This defines the columns of the table of songs used by the DataGrid component.
  // The format of the columns array and the DataGrid component itself is very similar to our
  // LazyTable component. The big difference is we provide all data to the DataGrid component
  // instead of loading only the data we need (which is necessary in order to be able to sort by column)
  const columns1 = [
    { field: 'name', headerName: 'Busines Name', width: 310, renderCell: (params) => (
        <Link onClick={() => setSelectedResId(params.row.business_id)}>{params.value}</Link>
    ) },
    { field: 'stars', headerName: 'Review Stars', width: 150 },
    { field: 'review_count', headerName: 'Review Count', width: 150 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'postal_code', headerName: 'Postal Code', width: 130 },
    { field: 'latitude', headerName: 'Latitude', width: 115 },
    { field: 'longitude', headerName: 'Longitude', width: 115 },
  ]

  const columns2 = [
    { field: 'similar_name', headerName: 'Similar Business Name', width: 310, 
    renderCell: (row) => <Link onClick={() => setSelectedResId(row.similar_business_id)}>{row.similar_name}</Link>
    },
    
    { field: 'similarity_score', headerName: 'Similarity Score', width: 150 },
  ]

<<<<<<< HEAD
  const inputStyles = {
    backgroundColor: '#f2f2f2',
    color: '#333',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '20px',
    width:'100%'
  };

  return (
    <Container>
      <React.Fragment><Banner2/></React.Fragment>
      {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
      <h2 style = {{ color: 'purple' }}> <u>Search Business </u> </h2>
      <h5>Please use the following area to look for the businesses of Philadelphia</h5>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField label='Business Name' value={restaurant_name} onChange={(e) => setName(e.target.value)} style={inputStyles}/>
        </Grid>
        <Grid item xs={8}>
          <TextField label='Business Category' value={categories} onChange={(e) => setCategories(e.target.value)} style={inputStyles}/>
        </Grid>
        <Grid item xs={8}>
          <TextField label='Restaurant ID (Note: Only used for similarity search)' value={restaurant_id} onChange={(e) => setRestaurant_id(e.target.value)} style={inputStyles}/>
=======
  // This component makes uses of the Grid component from MUI (https://mui.com/material-ui/react-grid/).
  // The Grid component is super simple way to create a page layout. Simply make a <Grid container> tag
  // (optionally has spacing prop that specifies the distance between grid items). Then, enclose whatever
  // component you want in a <Grid item xs={}> tag where xs is a number between 1 and 12. Each row of the
  // grid is 12 units wide and the xs attribute specifies how many units the grid item is. So if you want
  // two grid items of the same size on the same row, define two grid items with xs={6}. The Grid container
  // will automatically lay out all the grid items into rows based on their xs values.
  return (
    <Container>
      {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
      <h2>Search Business</h2>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <TextField label='Name' value={restaurant_name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={8}>
          <TextField label='Category' value={categories} onChange={(e) => setCategories(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={8}>
          <TextField label='Restaurant ID (Note: Only used for similarity search)' value={restaurant_id} onChange={(e) => setRestaurant_id(e.target.value)} style={{ width: "100%" }}/>
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
        </Grid>
        <Grid item xs={6}>
          <p>Review Stars</p>
          <Slider
            value={stars}
            min={0}
            max={5}
            step={1}
            onChange={(e, newValue) => setStars(newValue)}
            valueLabelDisplay='auto'
<<<<<<< HEAD
            style={{ color: 'purple', width: '100%'}}
=======
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
            valueLabelFormat={value => <div>{value}</div>}
          />
        </Grid>
        <Grid item xs={6}>
          <p>Review Count</p>
          <Slider
            value={review_count}
            min={0}
            max={300}
            step={5}
            onChange={(e, newValue) => setReview_count(newValue)}
            valueLabelDisplay='auto'
<<<<<<< HEAD
            style={{ color: 'purple', width: '100%' }}
            valueLabelFormat={value => <div>{value}</div>}
          />
        </Grid>
=======
            valueLabelFormat={value => <div>{value}</div>}
          />
        </Grid>
        {/* TODO (TASK 24): add sliders for danceability, energy, and valence (they should be all in the same row of the Grid) */}
        {/* Hint: consider what value xs should be to make them fit on the same row. Set max, min, and a reasonable step. Is valueLabelFormat is necessary? */}
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
        <Grid item xs={4}>
          <p>Postal Code</p>
          <Slider
            value={postal_code}
            min={19101}
            max={19155}
            step={5}
            onChange={(e, newValue) => setPostal_code(newValue)}
            valueLabelDisplay='auto'
<<<<<<< HEAD
            style={{ color: 'purple', width: '100%' }}
=======
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
            valueLabelFormat={value => <div>{value}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Latitude</p>
          <Slider
            value={latitude}
            min={38}
            max={41}
            step={0.1}
            onChange={(e, newValue) => setLatitude(newValue)}
            valueLabelDisplay='auto'
<<<<<<< HEAD
            style={{ color: 'purple', width: '100%' }}
=======
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
            valueLabelFormat={value => <div>{value}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Longitude</p>
          <Slider
            value={longitude}
            min={-76}
            max={-75}
            step={0.001}
            onChange={(e, newValue) => setLongitude(newValue)}
<<<<<<< HEAD
            style={{ color: 'purple', width: '100%' }}
=======
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
            valueLabelDisplay='auto'
            valueLabelFormat={value => <div>{value}</div>}
          />
        </Grid>


      </Grid>
      <Grid item>
<<<<<<< HEAD
      <Button onClick={() => search1() } style={{ left: '50%', transform: 'translateX(-50%)' , backgroundColor: 'salmon',
          color: 'white'}}>
       Search By Filter
      </Button>
      </Grid>
      
      <h2 style={{ color: 'purple' }}> Results With the Filter</h2>
=======
      <Button onClick={() => search1() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search By Filter
      </Button>
      </Grid>
      
      <h2>Results With the Filter</h2>
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
      <DataGrid
        rows={data}
        columns={columns1}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />

<<<<<<< HEAD
      <h2 style={{ color: 'purple' }}> Results With Similarity Score</h2>
      <h5>Results With the Similarity, Similar to "{restaurant_id}" (insert your business_id) </h5>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/similar_restaurant/${restaurant_id}`} columns={columns2} />
      <p></p>
      <p></p>
      <p></p>
      <Divider>
      <div style={{ display: 'flex' }}>
            <img src= {photo12} alt="Image 12" style={{ width: '125%', margin : '0px'}}/>
      </div>
      </Divider>
  
    </Container>

=======
      <h3>Results With the Similarity, Similar to "{restaurant_id}"</h3>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/similar_restaurant/${restaurant_id}`} columns={columns2} />
    </Container>
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
  );
}