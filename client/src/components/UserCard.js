import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
const config = require('../config.json');

export default function UserCard({ user_id, handleClose }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
<<<<<<< HEAD
    fetch(`http://localhost:8080/average_rating/${user_id}`, {method: 'GET',})
=======
    fetch(`http://${config.server_host}:${config.server_port}/average_rating/${user_id}`, {method: 'GET',})
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
       .then(res => res.json())
       .then(resJson => setUserData(resJson))
  }, [user_id]);


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
        <h1>Name: {userData.name}</h1>
        <p>User ID: {userData.user_id}</p>
        <p>Average Rating Given: {userData.average_rating}</p>
      </Box>
    </Modal>
  );
}