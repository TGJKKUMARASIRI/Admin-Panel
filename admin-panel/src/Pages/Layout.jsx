import React from 'react';
import Sidenave from '../Sidenave';
import ProtectedRoute from './ProtectedRoute';
import { Outlet } from 'react-router-dom';
// import Topnave from '../Topnave';

const Layout = ({ children }) => {
    return (
        // <div>
        //     <Topnave />
        <div style={{ display: 'flex' }}>
            <ProtectedRoute>
                <Sidenave />
                <main style={{ flexGrow: 1, padding: 20 }}>
                    <Outlet />
                </main>
            </ProtectedRoute>
        </div>
        // </div>
    );
};

export default Layout;