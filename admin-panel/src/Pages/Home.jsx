import React from 'react';
import Sidenave from '../Sidenave';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';  
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';

export default function Home() {
    return (
        <>
            <Box sx={{ display: 'flex' }}> 
                <Sidenave />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ maxWidth: '100%', height: 20 + 'vh' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                        <Card sx={{ maxWidth: '100%', height: 20 + 'vh' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                        <Card sx={{ maxWidth: '100%', height: 20 + 'vh' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                       
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                        <Card sx={{ height: 70 + 'vh' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                        <Card sx={{ height: 70 + 'vh' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
