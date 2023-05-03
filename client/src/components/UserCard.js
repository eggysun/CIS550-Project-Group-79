import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
const config = require('../config.json');

export default function UserCard({ user_id, handleClose }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/average_rating/${user_id}`, {method: 'GET',})
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