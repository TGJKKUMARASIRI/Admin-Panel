import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFlexaroUser from '../flexaro_user';

const Logout = () => {
    const { logout } = useFlexaroUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/LogIn');
    };
};
