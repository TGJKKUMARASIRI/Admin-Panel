import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createCompany } from './CreateCompanyApi';
import { createBranch } from './CreateBranchApi';

function NewCompany() {
    const [open, setOpen] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [brn, setBrn] = useState('');

    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name: companyName,
            email: companyEmail,
            phone: [phoneNumber],
            address: companyAddress,
            brn,
        };
        try {
            const result = await createCompany(formData);
            setSubmittedData(result);
            console.log('Form submitted', result);

            // Create a branch for the new company
            const branchData = {
                company: result._id,
                name: 'First Branch',
                address: companyAddress,
                phone: [phoneNumber],
                email: companyEmail,
            };
            const newBranch = await createBranch(branchData);
            console.log('Branch created', newBranch);

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
        setCompanyName('');
        setCompanyEmail('');
        setPhoneNumber('');
        setCompanyAddress('');
        setBrn('');
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
                + Add a New Company
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Add a New Company"}</DialogTitle>
                <DialogContent>
                    <Typography sx={{ marginBottom: 1 }}>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                sx={{ width: 500 }}
                                required
                                id="outlined-required"
                                label="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Company Email"
                                value={companyEmail}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Company Address"
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="BRN"
                                value={brn}
                                onChange={(e) => setBrn(e.target.value)}
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

export default NewCompany;
