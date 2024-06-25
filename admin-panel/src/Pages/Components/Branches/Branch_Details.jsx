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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewBranch from './Add_New_Branch';
import EditBranch from './Edit_Branch';
import DeleteBranch from './Delete_Branch';

const BranchTable = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const token = localStorage.getItem('jwtToken');
    const { companyId } = useParams();

    useEffect(() => {
        async function fetchBranches() {
            try {
                const response = await fetch(`${config.apiURL}/sys-company-manager/company/get-branches`, {
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
                setBranches(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchBranches();
    }, [companyId, token]);

    const handleEditButtonClick = (branchId) => {
        setSelectedBranchId(branchId);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setSelectedBranchId(null);
        setEditDialogOpen(false);
    };

    const handleDeleteButtonClick = (branchId) => {
        setSelectedBranchId(branchId);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSelectedBranchId(null);
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
                            branches.length === 0 ? (
                                <Typography variant="h6" align="center" style={{ margin: '20px 0' }}>
                                    Currently no branches
                                </Typography>
                            ) : (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Edit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {branches.map((branch) => (
                                            <TableRow key={branch._id}>
                                                <TableCell>{branch.name}</TableCell>
                                                <TableCell>{branch.address}</TableCell>
                                                <TableCell>{branch.phone.join(', ')}</TableCell>
                                                <TableCell>{branch.email}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => handleEditButtonClick(branch._id)}
                                                    >
                                                        <EditIcon style={{ color: '#00000e' }} />
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => handleDeleteButtonClick(branch._id)}
                                                    >
                                                        <DeleteIcon style={{ color: '#00000e' }} />
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
                    <NewBranch companyId={companyId} />
                </Box>
                {editDialogOpen && (
                    <EditBranch
                        companyId={companyId}
                        branchId={selectedBranchId}
                        onClose={handleCloseEditDialog}
                    />
                )}
                {deleteDialogOpen && (
                    <DeleteBranch
                        companyId={companyId}
                        branchId={selectedBranchId}
                        onClose={handleCloseDeleteDialog}
                    />
                )}
            </Stack>
        </div>
    );
};

export default BranchTable;
