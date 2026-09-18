const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;

        // Cart items
        this.cartItems = page.locator('#tbodyid tr');

        // Cart total
        this.totalPrice = page.locator('#totalp');

        // Place Order
        this.placeOrderButton = page.getByRole('button', {
            name: 'Place Order',
            exact: true
        });
    }

    // Get all cart items
    async getCartItems() {
        await expect(this.cartItems.first()).toBeVisible({
            timeout: 30000
        });

        return await this.cartItems.allTextContents();
    }

    // Check whether a product exists in the cart
    async isProductInCart(productName) {
        const product = this.cartItems.filter({
            hasText: productName
        });

        // Wait for the actual product row to appear
        await expect(product).toHaveCount(1, {
            timeout: 30000
        });

        await expect(product).toBeVisible({
            timeout: 30000
        });

        return true;
    }

    // Remove a specific product from the cart
    async removeProduct(productName) {
        const product = this.cartItems.filter({
            hasText: productName
        });

        await expect(product).toHaveCount(1, {
            timeout: 30000
        });

        await product.getByRole('link', {
            name: 'Delete',
            exact: true
        }).click();
    }

    // Get cart total
    async getTotalPrice() {
        await expect(this.totalPrice).toBeVisible({
            timeout: 30000
        });

        return await this.totalPrice.textContent();
    }

    // Click Place Order
    async clickPlaceOrder() {
        await expect(this.placeOrderButton).toBeVisible({
            timeout: 30000
        });

        await this.placeOrderButton.click();
    }
}

module.exports = CartPage;