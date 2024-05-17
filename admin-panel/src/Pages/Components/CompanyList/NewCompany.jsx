import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function NewCompany() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here
        console.log('Form submitted');
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Company Email"
                            />
                            <Stack spacing={2} direction={'row'}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone Number"
                                />
                                {/* <TextField
                                    id="outlined-required"
                                    label="Phone Number"
                                /> */}
                            </Stack>
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
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewCompany;
