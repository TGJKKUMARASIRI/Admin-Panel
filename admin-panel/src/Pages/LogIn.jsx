import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function LogIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here
        console.log('Form submitted');
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card sx={{ MaxWidth: 500, height: 400, alignItems: 'center', display: 'flex' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, marginBottom: 5 }}>
                            Log In
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    sx={{ width: 500 }}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel control={<Checkbox />} label="Remember me" />
                                <Button 
                                variant="contained" 
                                type="submit" 
                                sx={{ 
                                    backgroundColor: "#00000e",
                                    color: '#dbdbef',
                                    '&:hover': {
                                        backgroundColor: "#1a1a1a", // Set your desired hover background color
                                      }
                                    }}>
                                    Submit
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}