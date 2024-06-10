import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createUser } from './Add_New_User_Api';
import config from '../LogIn/config';

function NewUser({ companyId }) {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');

    useEffect(() => {
        // Fetch roles and set the admin role ID
        async function fetchRoles() {
            try {
                const response = await fetch(`${config.apiURL}/sys-company-manager/company/get-user-rolls`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const adminRole = data.find(role => role.slug === 'company-admin');
                if (adminRole) {
                    setRoleId(adminRole._id);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchRoles();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            company_id: companyId,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role_id: roleId, // Set this as the default value
        };
        try {
            const result = await createUser(formData);
            console.log('Form submitted', result);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form', error);
            // Handle error appropriately
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setOpen(false);
    };

    return (
        <div>
            <Button
                size="small"
                onClick={handleClickOpen}
                variant="contained"
                sx={{
                    backgroundColor: '#00000e', // Set your desired background color
                    color: '#dbdbef', // Set your desired text color
                    '&:hover': {
                        backgroundColor: "#1a1a1a", // Set your desired hover background color
                    }
                }}
            >
                + Add a New User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Add a New User"}</DialogTitle>
                <DialogContent>
                    <Typography sx={{ marginBottom: 1 }}>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                sx={{ width: 500 }}
                                required
                                id="outlined-required"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    backgroundColor: '#00000e', // Set your desired background color
                                    color: '#dbdbef', // Set your desired text color
                                    '&:hover': {
                                        backgroundColor: "#1a1a1a", // Set your desired hover background color
                                    }
                                }}
                            >
                                Add
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewUser;
