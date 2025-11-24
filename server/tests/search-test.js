const axios = require('axios');
async function fetchData() {
    try {
        const response = await axios.get('http://localhost:3001/search', {
            params: { q: 'notebook' }
        });
        console.log('Data fetched successfully:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();