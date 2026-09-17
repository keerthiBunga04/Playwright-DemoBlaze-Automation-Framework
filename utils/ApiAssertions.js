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
}

module.exports = ApiAssertions;