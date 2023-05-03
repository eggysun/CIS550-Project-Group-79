import { useState } from 'react';
import { Container, Grid, Link, TextField } from '@mui/material';
import LazyTable from '../components/LazyTable';
import UserCard from '../components/UserCard';

export default function LocationPage() {
    const [your_id, setYour_id] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    
    const columns = [
        { field: 'Friends_id', headerName: 'Your Friends ID',
        renderCell: (row) => <Link onClick={() => setSelectedUserId(row.Friends_id)}>{row.Friends_id}</Link>
    },
        { field: 'Friendss_id', headerName: 'Your Friends Friends ID',
        renderCell: (row) => <Link onClick={() => setSelectedUserId(row.Friendss_id)}>{row.Friendss_id}</Link>},
    ]

    return (
        <Container>
            {selectedUserId && <UserCard user_id={selectedUserId} handleClose={() => setSelectedUserId(null)} />}
            <h2>Search Your Friends' Friends' IDs</h2>
            <Grid container spacing={6}>
                <Grid item xs={8}>
                    <TextField label='Your ID' value={your_id} onChange={(e) => setYour_id(e.target.value)} style={{ width: "100%" }}/>
                </Grid>
            </Grid>      
            <h2>Results</h2>
            <LazyTable route={`http://localhost:8080/friends/${your_id}`} columns={columns} />
        </Container>
    );
}