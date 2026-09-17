const { test, expect } = require('@playwright/test');

const ProductApiClient = require('../../api/clients/ProductApiClient');
const ApiAssertions = require('../../utils/ApiAssertions');

test.describe('DemoBlaze Products API', () => {

    test('GET products should return product collection @smoke', async ({ request }) => {
        const productApi = new ProductApiClient(request);

        const response = await productApi.getAllProducts();

        await ApiAssertions.expectSuccessfulResponse(response);

        const responseBody = await response.json();

        ApiAssertions.expectProperty(responseBody, 'Items');
        ApiAssertions.expectArray(responseBody.Items);
        ApiAssertions.expectNotEmpty(responseBody.Items);
    });


    test('GET products should contain valid product details @regression', async ({ request }) => {
        const productApi = new ProductApiClient(request);

        const response = await productApi.getAllProducts();

        await ApiAssertions.expectSuccessfulResponse(response);

        const responseBody = await response.json();

        ApiAssertions.expectProperty(responseBody, 'Items');
        ApiAssertions.expectArray(responseBody.Items);
        ApiAssertions.expectNotEmpty(responseBody.Items);

        const firstProduct = responseBody.Items[0];

        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('title');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('cat');

        expect(typeof firstProduct.id).toBe('number');
        expect(typeof firstProduct.title).toBe('string');
        expect(typeof firstProduct.price).toBe('number');
        expect(typeof firstProduct.cat).toBe('string');
    });


    test('GET product by ID should return the requested product @regression', async ({ request }) => {
        const productApi = new ProductApiClient(request);

        const product = await productApi.getProductById(1);

        expect(product).toBeDefined();

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('cat');

        expect(product.id).toBe(1);
        expect(typeof product.title).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.cat).toBe('string');
    });


    // Add the negative test here
    test('GET product by invalid ID should return no product @negative', async ({ request }) => {
        const productApi = new ProductApiClient(request);

        const product = await productApi.getProductById(99999);

        expect(product).toBeUndefined();
    });

});