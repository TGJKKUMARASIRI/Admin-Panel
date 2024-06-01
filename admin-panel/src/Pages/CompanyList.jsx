import React from 'react';
// import Sidenave from '../Sidenave';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CompanyListTable from './Components/CompanyList/CompanyListTable';
import NewCompany from './Components/CompanyList/NewCompany';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import AddIcon from '@mui/icons-material/Add';

const StyledActions = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px'
});

const CompanyList = ({ children }) => {
    return (
        <>
                <div>
                    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card sx={{ maxWidth: '100%', height: '88vh' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Company List
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary"> */}
                                        <CompanyListTable />
                                        {/* </Typography> */}
                                    </CardContent>
                                    <StyledActions>
                                        <NewCompany />
                                    </StyledActions>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ maxWidth: '100%', height: '88vh' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Company Details
                                        </Typography>
                                            {children}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
        </>
    )
}

export default CompanyList;