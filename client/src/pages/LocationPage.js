import { useState } from 'react';
import { Container, Grid, Link, TextField } from '@mui/material';
import LazyTable from '../components/LazyTable';

import RestaurantCard from '../components/RestaurantCard';

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
      );


}