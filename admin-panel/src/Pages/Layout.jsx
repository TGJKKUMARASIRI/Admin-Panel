import React from 'react';
import Sidenave from '../Sidenave';
// import Topnave from '../Topnave';

const Layout = ({ children }) => {
    return (
        // <div>
        //     <Topnave />
        <div style={{ display: 'flex' }}>
            <Sidenave />
            <main style={{ flexGrow: 1, padding: 20 }}>
                {children}
            </main>
        </div>
        // </div>
    );
};

export default Layout;