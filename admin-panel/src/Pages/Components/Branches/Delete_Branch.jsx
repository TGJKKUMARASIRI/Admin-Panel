import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import config from '../LogIn/config';
import colors from '../../../colors';

function DeleteBranch({ branchId, onClose, companyId }) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${config.apiURL}/sys-company-manager/company/delete-branch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    branchId: branchId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to delete branch');
            }
            const data = await response.json();
            console.log('Branch deleted successfully:', data);
            window.location.reload();
            onClose(); // Close the dialog after successful delete
        } catch (error) {
            console.error('Error deleting branch:', error);
            // Handle error here (e.g., show error message)
        }
    };

    return (
        <div>
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Delete Branch</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this branch?</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        sx={{
                            color: colors.primary,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="primary"
                        variant="contained"
                        sx={{
                            backgroundColor: colors.delete_button_background,
                            color: colors.secondary,
                            '&:hover': {
                                backgroundColor: colors.delete_button_hover,
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

export default DeleteBranch;
