import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Container, Link, Divider } from '@mui/material';
=======
import { Container, Divider, Link } from '@mui/material';
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07

import LazyTable from '../components/LazyTable';
import RestaurantCard from '../components/RestaurantCard';
import Banner from '../components/Banner';
import React from 'react';
<<<<<<< HEAD
import photo12 from '../components/12.jpeg';
=======
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07

export default function HomePage() {
  const [resOfTheDay, setResOfTheDay] = useState({});
  const [selectedResId, setSelectedResId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/random')
      .then(res => res.json())
      .then(resJson => setResOfTheDay(resJson))
  }, []);

  const resColumns = [
    {
      field: 'business_name',
      headerName: 'Business Name',
      renderCell: (row) => <Link onClick={() => setSelectedResId(row.business_id)}>{row.business_name}</Link>
    },
    {
      field: 'Stars',
      headerName: 'Review Stars',
    },
    {
      field: 'zip',
      headerName: 'Zip Code',
    },
  ];

  return (
    <Container>
<<<<<<< HEAD
      <React.Fragment><Banner/> </React.Fragment>
      <Divider />
      <Divider />
      {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
      <h2 ><u>Check out your business of the day:&nbsp;
        <Link onClick={() => setSelectedResId(resOfTheDay.business_id)}>{resOfTheDay.name}</Link>
        </u>
      </h2>
      <Divider />
      <h4 style={{ color: 'purple' }}>Top Business in Philadelphia</h4>
      <LazyTable route={`http://localhost:8080/top_restaurant`} columns={resColumns} />
      <Divider />
      <Divider>
      <div style={{ display: 'flex' }}>
            <img src= {photo12} alt="Image 12" style={{ width: '125%', margin : '0px'}}/>
      </div>
      </Divider>
=======
      <React.Fragment><Banner/></React.Fragment>
      {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
      <h2>Check out your business of the day:&nbsp;
        <Link onClick={() => setSelectedResId(resOfTheDay.business_id)}>{resOfTheDay.name}</Link>
      </h2>
      <Divider />
      <h2>Top Business in Philadelphia</h2>
      <LazyTable route={`http://localhost:8080/top_restaurant`} columns={resColumns} />
      <Divider />
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
    </Container>
  );
};