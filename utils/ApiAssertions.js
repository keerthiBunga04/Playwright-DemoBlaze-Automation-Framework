const { expect } = require('@playwright/test');

class ApiAssertions {

    static async expectSuccessfulResponse(response) {
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    }

    static expectProperty(responseBody, propertyName) {
        expect(responseBody).toHaveProperty(propertyName);
    }

    static expectArray(value) {
        expect(Array.isArray(value)).toBeTruthy();
    }

    static expectNotEmpty(value) {
        expect(value.length).toBeGreaterThan(0);
    }

    static expectObject(value) {
        expect(value).toBeTypeOf('object');
        expect(value).not.toBeNull();
    }

    static expectString(value) {
        expect(typeof value).toBe('string');
    }

    static expectNumber(value) {
        expect(typeof value).toBe('number');
    }

    static expectPositiveNumber(value) {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThan(0);
    }

    static expectArrayContainsObject(array, propertyName) {
        expect(Array.isArray(array)).toBeTruthy();
        expect(array.length).toBeGreaterThan(0);

        for (const item of array) {
            expect(item).toHaveProperty(propertyName);
        }
    }
}

module.exports = ApiAssertions;