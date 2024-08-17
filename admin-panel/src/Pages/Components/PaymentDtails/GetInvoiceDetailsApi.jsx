import config from "../LogIn/config";

export async function GetInvoiceDetailsApi(companyId) {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${config.apiURL}/subscription-manager/get-invoices?company_id=${companyId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch subscription details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching subscription details:', error);
        throw error;
    }
}