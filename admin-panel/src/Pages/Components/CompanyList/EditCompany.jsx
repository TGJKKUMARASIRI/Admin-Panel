import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CompanyList from '../../CompanyList';
import { fetchCompanies } from './GetCompanyList';
import config from '../LogIn/config';
import Grid from '@mui/material/Grid';

function EditCompany() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        brn: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companies = await fetchCompanies(); // Assuming fetchCompanies is defined
                const foundCompany = companies.find((company) => company._id === companyId);
                setCompanyData(foundCompany);
            } catch (error) {
                console.error("There was an error fetching the company data!", error);
            }
        };

        fetchData();
    }, [companyId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        fetch(`${config.apiURL}/sys-company-manager/company/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(companyData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Company updated successfully", data);
                navigate(`/details/${companyId}`);
            })
            .catch(error => {
                console.error("There was an error updating the company!", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <CompanyList>
                <h2>Edit Company</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            required
                            variant="standard"
                            id="company-name"
                            name="name" // Add name attribute
                            label="Company Name"
                            value={companyData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            variant="standard"
                            id="company-email"
                            name="email" // Add name attribute
                            label="Company Email"
                            value={companyData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            variant="standard"
                            id="phone-number"
                            name="phone" // Add name attribute
                            label="Phone Number"
                            value={companyData.phone}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            variant="standard"
                            id="company-address"
                            name="address" // Add name attribute
                            label="Company Address"
                            value={companyData.address}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            variant="standard"
                            id="brn"
                            name="brn" // Add name attribute
                            label="BRN"
                            value={companyData.brn}
                            onChange={handleChange}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                            <Button
                                    variant="contained"
                                    sx={{
                                        width: '95%',
                                        backgroundColor: '#00000e',
                                        color: '#dbdbef',
                                        '&:hover': {
                                            backgroundColor: "#1a1a1a",
                                        }
                                    }}
                                    onClick={() => navigate(`/details/${companyId}`)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                            <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        width: '95%',
                                        backgroundColor: '#00000e',
                                        color: '#dbdbef',
                                        '&:hover': {
                                            backgroundColor: "#1a1a1a",
                                        }
                                    }}
                                >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </CompanyList>
        </div>
    );
}

export default EditCompany;