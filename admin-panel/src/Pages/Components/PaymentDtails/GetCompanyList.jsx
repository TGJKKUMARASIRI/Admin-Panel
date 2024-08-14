import config from "../LogIn/config";

export const fetchCompanies = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`${config.apiURL}/sys-company-manager/company/get`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// export const fetchCompanyById = async (id) => {
//   try {
//     const token = localStorage.getItem('jwtToken');
//     const response = await fetch(`${config.apiURL}/sys-company-manager/company/get/${id}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };