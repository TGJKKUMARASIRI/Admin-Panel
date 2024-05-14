import React from 'react';
// import Sidenave from '../Sidenave';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';  
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from './Layout';
import CompanyListTable from './Components/CompanyList/CompanyListTable';
// import Stack from '@mui/material/Stack';

export default function Home() {
    return (
        <>
            <Layout>
                <div>
                    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: '100%', height: 18 + 'vh' }}>
                                    <CardContent>
                                    
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: '100%', height: 18 + 'vh' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: '100%', height: 18 + 'vh' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={8}>
                                <Card sx={{ height: 68 + 'vh' }}>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                            Company List
                                        </Typography>
                                        <CompanyListTable />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ height: 68 + 'vh' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Payment Details
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Layout>
        </>
    )
}
