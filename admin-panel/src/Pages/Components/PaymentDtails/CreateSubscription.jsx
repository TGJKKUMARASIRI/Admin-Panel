import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { fetchCompanies } from './GetCompanyList';
import colors from '../../../colors';

export default function CreateSubscriptionForm() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState({
    packageName: 'Monthly Starter',
    packageDescription: '',
    packagePrice: 0,
    reccuringTime: 'monthly',
    packageExpires: '',
    isTrial: false,
    packageFeatures: [
      { name: 'maxUsers', value: 0 },
      { name: 'maxProducts', value: 0 },
      { name: 'maxProductCategories', value: 0 },
    ],
    valueAddedFeatures: [],
    usageMetrics: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await fetchCompanies();
        const foundCompany = companies.find((company) => company._id === id);
        setCompany(foundCompany);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!company) {
    return <div>No details available for this company</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (event) => {
    setSubscription((prev) => ({
      ...prev,
      isTrial: event.target.checked,
    }));
  };

  const handleFeatureChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFeatures = [...subscription.packageFeatures];
    updatedFeatures[index].value = value;
    setSubscription((prev) => ({
      ...prev,
      packageFeatures: updatedFeatures,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      company_id: id,
      subscription,
    });
    // Submit logic here
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      display="flex" 
      flexDirection="column" 
      alignItems="flex-start"
      sx={{
        backgroundColor: colors.box_background,
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        height: '94vh'
      }}
    >
      <h2>Create Subscription for {company.name}</h2>
      <TextField
        variant="standard"
        label="Package Name"
        name="packageName"
        value={subscription.packageName}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
      >
        <MenuItem value="Monthly Starter">Monthly Starter</MenuItem>
        <MenuItem value="Yearly Upgrade">Yearly Upgrade</MenuItem>
      </TextField>
      <TextField
        variant="standard"
        label="Package Description"
        name="packageDescription"
        value={subscription.packageDescription}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        variant="standard"
        label="Package Price"
        name="packagePrice"
        type="number"
        value={subscription.packagePrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        variant="standard"
        label="Recurring Time"
        name="reccuringTime"
        value={subscription.reccuringTime}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
      >
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="yearly">Yearly</MenuItem>
      </TextField>
      <TextField
        variant="standard"
        label="Package Expires"
        name="packageExpires"
        type="datetime-local"
        value={subscription.packageExpires}
        onChange={handleChange}
        // fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        sx={{
          marginBottom: '20px',
          '& .MuiInputBase-root': {
            borderRadius: '4px',
          },
          '& .MuiInputBase-input': {
            padding: '10px',
          },
          '& .Mui-focused': {
            borderColor: colors.primary,
          },
        }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={subscription.isTrial}
            onChange={handleToggleChange}
            name="isTrial"
            color="primary"
          />
        }
        label="Trial"
        sx={{ marginBottom: '20px' }}
      />
      <Stack direction="row" spacing={2} margin="normal">
        <TextField
          variant="standard"
          label="Max Users"
          name="maxUsers"
          type="number"
          value={subscription.packageFeatures[0].value}
          onChange={(e) => handleFeatureChange(0, e)}
          fullWidth
        />
        <TextField
          variant="standard"
          label="Max Products"
          name="maxProducts"
          type="number"
          value={subscription.packageFeatures[1].value}
          onChange={(e) => handleFeatureChange(1, e)}
          fullWidth
        />
        <TextField
          variant="standard"
          label="Max Product Categories"
          name="maxProductCategories"
          type="number"
          value={subscription.packageFeatures[2].value}
          onChange={(e) => handleFeatureChange(2, e)}
          fullWidth
        />
      </Stack>
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth
        sx={{
          backgroundColor: colors.primary,
          color: colors.secondary,
          '&:hover': {
            backgroundColor: colors.hover2,
          },
          marginTop: '40px',
        }}
      >
        Create Subscription
      </Button>
    </Box>
  );
}
