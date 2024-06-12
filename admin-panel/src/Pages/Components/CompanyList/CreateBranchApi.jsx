import config from "../LogIn/config";

export const createBranch = async (branchData) => {
    const token = localStorage.getItem('jwtToken'); // Replace with your auth token logic

    try {
        const response = await fetch(`${config.apiURL}/sys-company-manager/company/add-branch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(branchData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
