import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { GetInvoiceDetailsApi } from './GetInvoiceDetailsApi';

export default function InvoiceDetails() {
    const { id } = useParams();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await GetInvoiceDetailsApi(id);
                setInvoices(response.invoices);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Invoice Details</Typography>
            {invoices.length === 0 ? (
                <Typography>No invoices available</Typography>
            ) : (
                invoices.map((invoice) => (
                    <Paper key={invoice._id} sx={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h6">Invoice Number: {invoice.invoiceNumber}</Typography>
                        {invoice.invoiceItems.map((item, index) => (
                            <Box key={index} sx={{ marginBottom: '10px' }}>
                                <Typography variant="body1">Package Name: {item.name}</Typography>
                                <Typography variant="body1">Price: ${item.unitPrice}</Typography>
                            </Box>
                        ))}
                        <Divider sx={{ marginBottom: '10px' }} />
                        <Typography variant="body1">Invoice Date: {new Date(invoice.invoiceDate).toLocaleString()}</Typography>
                        <Typography variant="body1">Due Date: {new Date(invoice.dueDate).toLocaleString()}</Typography>
                        <Typography variant="body1">Total Amount: ${invoice.totalAmount}</Typography>
                        <Typography variant="body1">Paid Amount: ${invoice.paidAmount}</Typography>
                        <Typography variant="body1">Due Amount: ${invoice.dueAmount}</Typography>
                        <Typography variant="body1">Auto Recurring Payment: {invoice.autoReccuringPayment ? 'Yes' : 'No'}</Typography>
                    </Paper>
                ))
            )}
        </Box>
    );
}
