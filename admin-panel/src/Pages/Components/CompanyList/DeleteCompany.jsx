import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import config from '../LogIn/config';

function DeleteCompany({ companyId }) {
    const [open, setOpen] = useState(false); // Set this to the company ID you want to delete
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${config.apiURL}/sys-company-manager/company/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace with your actual token
                },
                body: JSON.stringify({ _id: companyId })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setOpen(false);
                navigate('/Company List')
                // Handle success (e.g., show a success message, refresh the company list, etc.)
            } else {
                const errorData = await response.json();
                console.error(errorData);
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div>
            <Button
                size="small"
                onClick={handleClickOpen}
                variant="contained"
                sx={{
                    backgroundColor: '#00000e',
                    color: '#dbdbef',
                    '&:hover': {
                        backgroundColor: "#1a1a1a",
                    }
                }}
            >
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this company? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        sx={{
                            backgroundColor: '#00000e',
                            color: '#dbdbef',
                            '&:hover': {
                                backgroundColor: "#1a1a1a",
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="primary" autoFocus
                        sx={{
                            backgroundColor: '#8B0000',
                            color: '#dbdbef',
                            '&:hover': {
                                backgroundColor: "#2a0000",
                            }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteCompany;
