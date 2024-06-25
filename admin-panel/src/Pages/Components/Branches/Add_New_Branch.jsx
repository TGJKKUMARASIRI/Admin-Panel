import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createBranch } from '../CompanyList/CreateBranchApi';

function NewBranch({ companyId }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            company: companyId,
            name,
            address,
            phone: phone.split(',').map((p) => p.trim()), // Convert comma-separated string to array
            email
        };
        try {
            const result = await createBranch(formData);
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
        setName('');
        setAddress('');
        setPhone('');
        setEmail('');
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
                + Add a New Branch
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Add a New Branch"}</DialogTitle>
                <DialogContent>
                    <Typography sx={{ marginBottom: 1 }}>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                sx={{ width: 500 }}
                                required
                                id="outlined-required"
                                label="Branch Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                id="outlined-required"
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <TextField
                                id="outlined-required"
                                label="Phone (comma-separated for multiple)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                id="outlined-required"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

export default NewBranch;
