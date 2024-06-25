import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyList from '../../CompanyList';
import { fetchCompanies } from './GetCompanyList';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DeleteCompany from './DeleteCompany';
import EditButton from './EditCompanyButton';
import UsersButton from '../CompanyUsers/Users_Button';
import BranchButton from '../Branches/Branch_Button';

export default function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return (
      <div>
        <CompanyList>
          No details available for this company
        </CompanyList>
      </div>
    );
  }

  return (
    <div>
      <CompanyList>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box display="flex" justifyContent="right" width="100%">
            <Stack direction="row" spacing={2}>
              <EditButton companyId={id} />
              <DeleteCompany companyId={id} />
            </Stack>
          </Box>
          <h2>Details for {company.name}</h2>
          <p>BRN: {company.brn}</p>
          <p>Email: {company.email}</p>
          <p>Address: {company.address}</p>
          <p>Phone: {company.phone.join(', ')}</p>
          {/* Display other fields as needed */}
          <Box>
            <Stack direction="row" spacing={2}>
              <UsersButton companyId={id} />
              <BranchButton companyId={id} />
            </Stack>
          </Box>
        </Box>
      </CompanyList>
    </div>
  );
}
