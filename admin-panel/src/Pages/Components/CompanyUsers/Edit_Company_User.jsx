import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import config from '../LogIn/config';

function EditUser({ userId, onClose, companyId }) {
    // const { userId } = useParams();
    // const { companyId } = useParams();
    // const navigate = useNavigate();
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role_id: ''
    });

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        async function fetchUsers() {
            try {
                const response = await fetch(`${config.apiURL}/sys-company-manager/company/get-user-list`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        companyId: companyId,
                        perPage: 20,
                        page: 1
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const foundUser = data.find((user) => user._id === userId);
                setUserData(foundUser || {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    role_id: ''
                });
                // setOpen(true); // Open the dialog box when data is fetched
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [userId, companyId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        fetch(`${config.apiURL}/sys-company-manager/company/edit-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ ...userData, _id: userId }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("User updated successfully", data);
                // setOpen(false);
                // navigate(`/user-details/${userId}`);
                window.location.reload();
                onClose();
            })
            .catch(error => {
                console.error("There was an error updating the user!", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // const handleClose = () => {
    //     // setOpen(false);
    //     // navigate('/user-list'); // Navigate back to the user list
    //     onClose();
    // };

    return (
        <div>
            {/* <Button variant="contained" color="primary" onClick={handleOpen}>
                Edit User
            </Button> */}
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                required
                                sx={{ width: 500 }}
                                // variant="standard"
                                id="user-first-name"
                                name="first_name"
                                // label="First Name"
                                value={userData.first_name}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                // variant="standard"
                                id="user-last-name"
                                name="last_name"
                                // label="Last Name"
                                value={userData.last_name}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                // variant="standard"
                                id="user-email"
                                name="email"
                                // label="Email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                            {/* <TextField
                                    variant="standard"
                                    id="user-password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                /> */}
                            {/* <TextField
                                    required
                                    variant="standard"
                                    id="user-role"
                                    name="role_id"
                                    label="Role ID"
                                    value={userData.role_id}
                                    onChange={handleChange}
                                /> */}
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        sx={{
                            // backgroundColor: '#00000e',
                            color: '#00000e',
                            // '&:hover': {
                            //     backgroundColor: "#1a1a1a",
                            // }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        sx={{
                            backgroundColor: '#00000e',
                            color: '#dbdbef',
                            '&:hover': {
                                backgroundColor: "#1a1a1a",
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditUser;