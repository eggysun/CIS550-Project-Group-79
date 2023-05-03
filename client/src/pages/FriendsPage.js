import { useState } from 'react';
<<<<<<< HEAD
import { Container,Grid, Link, TextField, Divider} from '@mui/material';
import LazyTable from '../components/LazyTable';
import UserCard from '../components/UserCard';
import RestaurantCard from '../components/RestaurantCard';
import photo1 from '../components/9.jpeg';
import photo2 from '../components/10.jpeg';
import photo3 from '../components/11.jpeg';
import photo12 from '../components/12.jpeg';
=======
import { Container, Grid, Link, TextField } from '@mui/material';
import LazyTable from '../components/LazyTable';
import UserCard from '../components/UserCard';
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07

export default function LocationPage() {
    const [your_id, setYour_id] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
<<<<<<< HEAD
    const [selectedResId, setSelectedResId] = useState(null);
    
    const columns1 = [
=======
    
    const columns = [
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
        { field: 'Friends_id', headerName: 'Your Friends ID',
        renderCell: (row) => <Link onClick={() => setSelectedUserId(row.Friends_id)}>{row.Friends_id}</Link>
    },
        { field: 'Friendss_id', headerName: 'Your Friends Friends ID',
        renderCell: (row) => <Link onClick={() => setSelectedUserId(row.Friendss_id)}>{row.Friendss_id}</Link>},
    ]

<<<<<<< HEAD
    const columns2 = [
        { field: 'name', headerName: 'Business Name',
        renderCell: (row) => <Link onClick={() => setSelectedResId(row.business_id)}>{row.name}</Link>
    },
        { field: 'address', headerName: 'Address'},
        { field: 'postal_code', headerName: 'Postal Code'},
        { field: 'stars', headerName: 'Review Stars'},
        { field: 'friend_id', headerName: 'Your Friends ID',
        renderCell: (row) => <Link onClick={() => setSelectedUserId(row.friend_id)}>{row.friend_id}</Link>
    },
    ]

    const columns3 = [
        { field: 'user_name', headerName: 'User Name',
        renderCell: (row) => <Link onClick={() => setSelectedUserId(row.user_id)}>{row.user_name}</Link>
    },
        { field: 'business_name', headerName: 'You both Reviewed This Business', 
        renderCell: (row) => <Link onClick={() => setSelectedResId(row.business_id)}>{row.business_name}</Link>},
        { field: 'stars', headerName: 'Review Star Given'},
    ]

    const inputStyles = {
        backgroundColor: '#f2f2f2',
        color: '#333',
        border: '1px solid #ccc',
        padding: '5px',
        borderRadius: '20px',
        width:'100%'
      };

    return (
        <Container>
            <div style={{ display: 'flex', margin: '20px'}}>
            <img src= {photo1} alt="Image 1" style={{ width: '75%', objectFit: 'cover', margin: '10px' }} />
            <img src= {photo2} alt="Image 2" style={{ width: '75%', objectFit: 'cover', margin: '10px' }} />
            <img src= {photo3} alt="Image 2" style={{ width: '75%', objectFit: 'cover', margin: '10px' }} />
          </div>

            {selectedUserId && <UserCard user_id={selectedUserId} handleClose={() => setSelectedUserId(null)} />}
            {selectedResId && <RestaurantCard business_id={selectedResId} handleClose={() => setSelectedResId(null)} />}
            <h2 style = {{ color: 'purple' }}><u>Search</u></h2>
            
            <Grid container spacing={6}>
                <Grid item xs={8}>
                    <TextField label='Your ID' value={your_id} onChange={(e) => setYour_id(e.target.value)} style={inputStyles}/>
                </Grid>
            </Grid>      
            <p></p>
            <h2 style = {{ color: 'purple' }}> What your friends have reviewed:</h2>
            <LazyTable route={`http://localhost:8080/friends_review/${your_id}`} columns={columns2} />
            
            <p></p>
            <h2 style = {{ color: 'purple' }}>Results of Users with Similar Taste as You</h2>
            <LazyTable route={`http://localhost:8080/similar_taste/${your_id}`} columns={columns3} />


            <p></p>
            <h2 style = {{ color: 'purple' }}>Results For Finding Friends</h2>
            <LazyTable route={`http://localhost:8080/friends/${your_id}`} columns={columns1} />

            <Divider>
                <div style={{ display: 'flex' }}>
                        <img src= {photo12} alt="Image 12" style={{ width: '125%', margin : '0px'}}/>
                </div>
            </Divider>
            
            
=======
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
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
        </Container>
    );
}