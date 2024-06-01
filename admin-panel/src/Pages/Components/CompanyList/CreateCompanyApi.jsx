import config from "../LogIn/config";

export const createCompany = async (companyData) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify(companyData),
    };

    try {
        const response = await fetch(`${config.apiURL}/sys-company-manager/company/create`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};