import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import colors from '../../../colors';

function UsersButton({ companyId }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/company-users/${companyId}`);
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
            Users
        </Button>
    );
}

export default UsersButton;