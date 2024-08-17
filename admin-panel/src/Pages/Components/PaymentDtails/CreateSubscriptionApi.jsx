import config from "../LogIn/config";

export async function CreateSubscriptionApi(companyId, subscription) {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${config.apiURL}/subscription-manager/add-subscription`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_id: companyId,
                subscription: subscription,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add subscription: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding subscription:', error);
        throw error;
    }
}
