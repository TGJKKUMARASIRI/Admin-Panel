import config from "../LogIn/config";

export const creatBranch = async (userData) => {
    const response = await fetch(`${config.apiURL}/sys-company-manager/company/add-branch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
};