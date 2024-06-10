import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function EditButton({ companyId }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit-company/${companyId}`);
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
            <EditIcon />
        </Button>
    );
}

export default EditButton;