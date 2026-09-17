const { test, expect } = require('@playwright/test');
const ProductApiClient = require('../../api/clients/ProductApiClient');

test.describe('DemoBlaze Products API', () => {
    test('GET products should return product collection @smoke', async ({ request }) => {
        const productApi = new ProductApiClient(request);

        const response = await productApi.getAllProducts();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('Items');
        expect(Array.isArray(responseBody.Items)).toBeTruthy();
        expect(responseBody.Items.length).toBeGreaterThan(0);
    });
});