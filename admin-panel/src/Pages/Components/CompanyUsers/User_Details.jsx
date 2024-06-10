import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, CircularProgress,
    Stack
} from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import config from '../LogIn/config';
import Typography from '@mui/material/Typography';
import NewUser from './Add_New_User';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('jwtToken');
    const { companyId } = useParams();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`${config.apiURL}/sys-company-manager/company/get-user-list`, {
                    method: 'POST', // Updated to POST
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        companyId: companyId,
                        perPage: 20, // You can adjust this value or make it dynamic
                        page: 1 // You can adjust this value or make it dynamic
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [companyId, token]);

    return (
        <div>
            <Stack spacing={2}>
                <Box>
                    <TableContainer component={Paper}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            users.length === 0 ? (
                                <Typography variant="h6" align="center" style={{ margin: '20px 0' }}>
                                    Currently no users
                                </Typography>
                            ) : (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Company</TableCell>
                                            <TableCell>Edit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role ? user.role.name : 'Role Not Specified'}</TableCell>
                                                <TableCell>{user.company ? user.company.name : 'Company Not Specified'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )
                        )}
                    </TableContainer>
                </Box>
                <Box display="flex" justifyContent="right" width="100%">
                    <NewUser companyId={companyId} />
                </Box>
            </Stack>
        </div>
    );
};

export default UserTable;
