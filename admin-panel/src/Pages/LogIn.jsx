import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import useFlexaroUser from '../flexaro_user';
import { useNavigate } from 'react-router-dom';
import config from './Components/LogIn/config';

export default function LogIn() {
    const { login, user, isLoading, error } = useFlexaroUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError(null); // Clear previous errors

        try {
            const response = await fetch(`${config.apiURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const token = data.token;

            await login({ email, token });

            localStorage.setItem('jwtToken', token);

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            navigate('/');
        } catch (error) {
            setLoginError('Login failed. Please try again.');
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card sx={{ height: 400, alignItems: 'center', display: 'flex' }}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                                    label="Remember me"
                                />
                                {loginError && (
                                    <Typography color="error" variant="body2" align="center">
                                        {loginError}
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        backgroundColor: "#00000e",
                                        color: '#dbdbef',
                                        '&:hover': {
                                            backgroundColor: "#1a1a1a",
                                        }
                                    }}>
                                    LogIn
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
