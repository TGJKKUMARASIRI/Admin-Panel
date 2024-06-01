import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyList from '../../CompanyList';
import { fetchCompanies } from './GetCompanyList';

// const sampleData = [
//   { id: 0, dessert: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//   { id: 1, dessert: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
//   { id: 2, dessert: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//   { id: 3, dessert: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//   { id: 4, dessert: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
// ];

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
        <h2>Details for {company.name}</h2>
        <p>BRN: {company.brn}</p>
        <p>Email: {company.email}</p>
        <p>Address: {company.address}</p>
        <p>Phone: {company.phone.join(', ')}</p>
        {/* Display other fields as needed */}
      </CompanyList>
    </div>
  );
}
