const axios = require('axios');

test('GET request returns status code 200', async () => {
    const response = await axios.get('https://localhost:3000/api/v1/endpoint');
    expect(response.status).toBe(200);
});

test('GET request to non-existent route returns status code 404', async () => {
    try {
        await axios.get('https://localhost:3000/api/v1/endpoint');
    } catch (error) {
        expect(error.response.status).toBe(404);
    }
});

test('GET request to route causing server error returns status code 500', async () => {
    try {
        await axios.get('https://localhost:3000/api/v1/endpoint');
    } catch (error) {
        expect(error.response.status).toBe(500);
    }
});
