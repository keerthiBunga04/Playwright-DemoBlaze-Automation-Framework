const { test, expect } = require('../../fixtures/test-fixtures');

const ProductApiClient = require('../../api/clients/ProductApiClient');
const ApiAssertions = require('../../utils/ApiAssertions');

test.describe('DemoBlaze Products API', () => {

    test(
        'GET products should return product collection @smoke',
        async ({ request }) => {
            const productApi = new ProductApiClient(request);

            const response = await productApi.getAllProducts();

            await ApiAssertions.expectSuccessfulResponse(response);

            const responseBody = await response.json();

            ApiAssertions.expectObject(responseBody);
            ApiAssertions.expectProperty(responseBody, 'Items');
            ApiAssertions.expectArray(responseBody.Items);
            ApiAssertions.expectNotEmpty(responseBody.Items);
        }
    );


    test(
        'GET products should contain valid product details @regression',
        async ({ request }) => {
            const productApi = new ProductApiClient(request);

            const response = await productApi.getAllProducts();

            await ApiAssertions.expectSuccessfulResponse(response);

            const responseBody = await response.json();

            ApiAssertions.expectObject(responseBody);
            ApiAssertions.expectProperty(responseBody, 'Items');
            ApiAssertions.expectArray(responseBody.Items);
            ApiAssertions.expectNotEmpty(responseBody.Items);

            const firstProduct = responseBody.Items[0];

            ApiAssertions.expectObject(firstProduct);

            expect(firstProduct).toHaveProperty('id');
            expect(firstProduct).toHaveProperty('title');
            expect(firstProduct).toHaveProperty('price');
            expect(firstProduct).toHaveProperty('cat');

            ApiAssertions.expectNumber(firstProduct.id);
            ApiAssertions.expectString(firstProduct.title);
            ApiAssertions.expectPositiveNumber(firstProduct.price);
            ApiAssertions.expectString(firstProduct.cat);
        }
    );


    test(
        'GET product by ID should return the requested product @regression',
        async ({ request, testData }) => {
            const productApi = new ProductApiClient(request);

            const productId = testData.products.api.validProductId;

            const product = await productApi.getProductById(productId);

            ApiAssertions.expectObject(product);

            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('title');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('cat');

            expect(product.id).toBe(productId);

            ApiAssertions.expectString(product.title);
            ApiAssertions.expectPositiveNumber(product.price);
            ApiAssertions.expectString(product.cat);
        }
    );


    test(
        'GET product by invalid ID should return no product @negative',
        async ({ request, testData }) => {
            const productApi = new ProductApiClient(request);

            const invalidProductId =
                testData.products.api.invalidProductId;

            const product =
                await productApi.getProductById(invalidProductId);

            expect(product).toBeUndefined();
        }
    );


    test(
        'GET products should contain valid product categories @regression',
        async ({ request }) => {
            const productApi = new ProductApiClient(request);

            const response = await productApi.getAllProducts();

            await ApiAssertions.expectSuccessfulResponse(response);

            const responseBody = await response.json();

            ApiAssertions.expectObject(responseBody);
            ApiAssertions.expectProperty(responseBody, 'Items');
            ApiAssertions.expectArray(responseBody.Items);
            ApiAssertions.expectNotEmpty(responseBody.Items);

            const expectedCategories = [
                'phone',
                'notebook',
                'monitor'
            ];

            for (const product of responseBody.Items) {
                ApiAssertions.expectString(product.cat);

                expect(expectedCategories).toContain(
                    product.cat.toLowerCase()
                );
            }
        }
    );

});