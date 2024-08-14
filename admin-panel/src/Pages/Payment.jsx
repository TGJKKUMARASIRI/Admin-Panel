import React from 'react';
import Typography from '@mui/material/Typography';
import CompanyListTable from './Components/PaymentDtails/CompanyListTable';
import colors from '../colors';
// import Sidenave from '../Sidenave';
// import Box from '@mui/material/Box';

export default function Payment() {
    return (
        <>
            <div>
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        color: colors.primary,
                    }}
                >
                    Company List
                </Typography>
                <CompanyListTable />
            </div>
        </>
    )
}