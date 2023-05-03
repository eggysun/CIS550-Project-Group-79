import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
const config = require('../config.json');

export default function RestaurantCard({ business_id, handleClose }) {
  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/restaurant/${business_id}`, {method: 'GET',})
       .then(res => res.json())
       .then(resJson => setRestaurantData(resJson))
  }, [business_id]);


  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 600 }}
      >
        <h1>{restaurantData.name}</h1>
        <p>Business ID: {restaurantData.business_id}</p>
        <p>Address: {restaurantData.address}</p>
        <p>City: {restaurantData.city}</p>
        <p>Zip Code: {restaurantData.postal_code}</p>
        <p>Reviews Stars: {restaurantData.stars}</p>
        <p>Reviews Counts: {restaurantData.review_count}</p>
        <p>Categories: {restaurantData.categories}</p>
        <p>Latitude: {restaurantData.latitude}</p>
        <p>Longitude: {restaurantData.longitude}</p>
      </Box>
    </Modal>
  );
}