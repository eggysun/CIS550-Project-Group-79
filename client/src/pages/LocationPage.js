import { useState } from 'react';
<<<<<<< HEAD
import { Container, Grid, Link, TextField, Divider} from '@mui/material';
import LazyTable from '../components/LazyTable';

import RestaurantCard from '../components/RestaurantCard';
import photo from '../components/7.jpeg';
import photo12 from '../components/12.jpeg';
=======
import { Container, Grid, Link, TextField } from '@mui/material';
import LazyTable from '../components/LazyTable';

import RestaurantCard from '../components/RestaurantCard';
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07

export default function LocationPage() {
    const [selectedResId, setSelectedResId] = useState(null);
    const [restaurant_id, setRestaurant_id] = useState('');

    const columns = [
        { field: 'name', headerName: 'Busines Name', width: 310, 
        renderCell: (row) => <Link onClick={() => setSelectedResId(row.business_id)}>{row.name}</Link>
        },
        { field: 'distance', headerName: 'Distance (in meters)', width: 150 },
        { field: 'stars', headerName: 'Review Stars', width: 150 },
        { field: 'review_count', headerName: 'Review Count', width: 150 },
        { field: 'postal_code', headerName: 'Postal Code', width: 130 },
        { field: 'latitude', headerName: 'Latitude', width: 115 },
        { field: 'longitude', headerName: 'Longitude', width: 115 },
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
           <div style={{ display: 'flex' }}>
            <img src= {photo} alt="Image 1" style={{ width: '125%', margin : '20px'}}/>
          </div>
          <Divider />
          {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
          <Divider />
          <h2 style = {{ color: 'purple' }} > Search Closest Business with a Business ID</h2>
          <Grid container spacing={6}>
            <Grid item xs={8}>
              <TextField label='Restaurant ID (Note: Please input exact Business ID to get the distance)' value={restaurant_id} onChange={(e) => setRestaurant_id(e.target.value)} style={inputStyles}/>
            </Grid>
          </Grid>
          <p></p>
          <h2 style = {{ color: 'purple' }}>Results</h2>
          <LazyTable route={`http://localhost:8080/closest_restaurant/${restaurant_id}`} columns={columns} />
          <Divider>
          <div style={{ display: 'flex' }}>
                <img src= {photo12} alt="Image 12" style={{ width: '125%', margin : '0px'}}/>
          </div>
          </Divider>
        </Container>

=======
      return (
        <Container>
          {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
          <h2>Search Closest Business with a Business ID</h2>
          <Grid container spacing={6}>
            <Grid item xs={8}>
              <TextField label='Restaurant ID (Note: Please input exact Business ID to get the distance)' value={restaurant_id} onChange={(e) => setRestaurant_id(e.target.value)} style={{ width: "100%" }}/>
            </Grid>
          </Grid>
          
          <h2>Results</h2>
          <LazyTable route={`http://localhost:8080/closest_restaurant/${restaurant_id}`} columns={columns} />
        </Container>
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
      );


}