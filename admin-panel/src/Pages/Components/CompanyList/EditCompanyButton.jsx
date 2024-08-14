import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import colors from '../../../colors';

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
                backgroundColor: colors.primary,
                color: colors.secondary,
                '&:hover': {
                    backgroundColor: colors.hover2,
                }
            }}
        >
            <EditIcon />
        </Button>
    );
}

export default EditButton;