import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, CircularProgress,
    Stack, Button
} from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import config from '../LogIn/config';
import Typography from '@mui/material/Typography';
import NewUser from './Add_New_User';
import EditUser from './Edit_Company_User';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteUser from './Delete_Company_User';
import colors from '../../../colors';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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

    const handleEditButtonClick = (userId) => {
        setSelectedUserId(userId);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setSelectedUserId(null);
        setEditDialogOpen(false);
    };

    const handleDeleteButtonClick = (userId) => {
        setSelectedUserId(userId);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSelectedUserId(null);
        setDeleteDialogOpen(false);
    };

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
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role ? user.role.name : 'Role Not Specified'}</TableCell>
                                                <TableCell>{user.company ? user.company.name : 'Company Not Specified'}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => handleEditButtonClick(user._id)}
                                                    >
                                                        <EditIcon style={{ color: colors.primary }} />
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => handleDeleteButtonClick(user._id)}
                                                    >
                                                        <DeleteIcon style={{ color: colors.primary }} />
                                                    </Button>
                                                </TableCell>
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
                {editDialogOpen && (
                    <EditUser
                        companyId={companyId}
                        userId={selectedUserId}
                        onClose={handleCloseEditDialog}
                    />
                )}
                {deleteDialogOpen && (
                    <DeleteUser
                        companyId={companyId}
                        userId={selectedUserId}
                        onClose={handleCloseDeleteDialog}
                    />
                )}
            </Stack>
        </div>
    );
};

export default UserTable;
