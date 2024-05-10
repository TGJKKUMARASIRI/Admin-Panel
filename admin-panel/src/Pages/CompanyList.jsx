import React from 'react';
import Sidenave from '../Sidenave';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import AddIcon from '@mui/icons-material/Add';

const  StyledActions= styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '20px'
});

export default function CompanyList() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidenave />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card sx={{ maxWidth: '100%', height: '90vh' }}>
                                <StyledActions>
                                    <Button size="small">+ Add a Company</Button>
                                </StyledActions>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Company List
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card sx={{ maxWidth: '100%', height: '90vh' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Company Details
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
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