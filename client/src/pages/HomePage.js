import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';

import LazyTable from '../components/LazyTable';
import RestaurantCard from '../components/RestaurantCard';
import Banner from '../components/Banner';
import React from 'react';

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
      <React.Fragment><Banner/></React.Fragment>
      {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
      <h2>Check out your business of the day:&nbsp;
        <Link onClick={() => setSelectedResId(resOfTheDay.business_id)}>{resOfTheDay.name}</Link>
      </h2>
      <Divider />
      <h2>Top Business in Philadelphia</h2>
      <LazyTable route={`http://localhost:8080/top_restaurant`} columns={resColumns} />
      <Divider />
    </Container>
  );
};