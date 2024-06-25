import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import config from '../LogIn/config';

function EditBranch({ branchId, onClose, companyId }) {
    const [loading, setLoading] = useState(true);
    const [branchData, setBranchData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        async function fetchBranch() {
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
                const foundBranch = data.find((branch) => branch._id === branchId);
                setBranchData(foundBranch || {
                    name: '',
                    address: '',
                    phone: '',
                    email: ''
                });
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBranch();
    }, [branchId, companyId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        fetch(`${config.apiURL}/sys-company-manager/company/update-branch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ ...branchData, _id: branchId }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Branch updated successfully", data);
                window.location.reload();
                onClose();
            })
            .catch(error => {
                console.error("There was an error updating the branch!", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBranchData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Edit Branch</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                required
                                sx={{ width: 500 }}
                                id="branch-name"
                                name="name"
                                label="Branch Name"
                                value={branchData.name}
                                onChange={handleChange}
                            />
                            <TextField
                                id="branch-address"
                                name="address"
                                label="Address"
                                value={branchData.address}
                                onChange={handleChange}
                            />
                            <TextField
                                id="branch-phone"
                                name="phone"
                                label="Phone"
                                value={branchData.phone}
                                onChange={handleChange}
                            />
                            <TextField
                                id="branch-email"
                                name="email"
                                label="Email"
                                value={branchData.email}
                                onChange={handleChange}
                            />
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        sx={{
                            color: '#00000e',
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

export default EditBranch;
