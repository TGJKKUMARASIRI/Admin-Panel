import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function BranchButton({ companyId }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/company-branches/${companyId}`);
    };

    return (
        <Button
            size="small"
            onClick={handleEditClick}
            variant="contained"
            sx={{
                backgroundColor: '#00000e',
                color: '#dbdbef',
                '&:hover': {
                    backgroundColor: "#1a1a1a",
                }
            }}
        >
            Branches
        </Button>
    );
}

export default BranchButton;