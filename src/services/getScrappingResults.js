import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001/search';

export async function getScrappingResults(query) {
    const response = await axios.get(BACKEND_URL, {
        params: { q: query }
    });
    return response.data;
}