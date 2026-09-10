class CartPage {

    constructor(page) {
        this.page = page;

        // Cart Items
        this.cartItems = page.locator('#tbodyid tr');

        // Cart Total
        this.totalPrice = page.locator('#totalp');

        // Place Order
        this.placeOrderButton = page.getByRole('button', {
            name: 'Place Order'
        });
    }

    // Get all cart items
    async getCartItems() {
        return await this.cartItems.allTextContents();
    }

    // Check whether a product exists in the cart
    async isProductInCart(productName) {
    const product = this.cartItems.filter({
        hasText: productName
    });

    await product.waitFor({ state: 'visible' });

    return true;
}

    // Remove a specific product from the cart
    async removeProduct(productName) {
        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.getByRole('link', {
            name: 'Delete'
        }).click();
    }

    // Get cart total
    async getTotalPrice() {
        return await this.totalPrice.textContent();
    }

    // Click Place Order
    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = CartPage;