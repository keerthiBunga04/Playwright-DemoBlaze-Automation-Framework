const { expect } = require('@playwright/test');

class ProductPage {

    constructor(page) {
        this.page = page;

        // Product details
        this.productTitle = page.locator('h2.name');

        this.productPrice = page.locator('.price-container');

        // Add to cart
        this.addToCartButton = page.getByRole('link', {
            name: 'Add to cart',
            exact: true
        });
    }

    // Select any product from the homepage
    async selectProduct(productName) {

        const productLink = this.page.getByRole('link', {
            name: productName,
            exact: true
        });

        await expect(productLink).toBeVisible({
            timeout: 30000
        });

        // Click product without depending on browser-specific navigation timing
        await productLink.click();

        // Wait until product details are actually available
        await expect(this.productTitle).toBeVisible({
            timeout: 30000
        });

        await expect(this.addToCartButton).toBeVisible({
            timeout: 30000
        });
    }

    // Get product title
    async getProductTitle() {
        await expect(this.productTitle).toBeVisible({
            timeout: 30000
        });

        return await this.productTitle.textContent();
    }

    // Get product price
    async getProductPrice() {
        await expect(this.productPrice).toBeVisible({
            timeout: 30000
        });

        return await this.productPrice.textContent();
    }

    // Click Add to Cart
    async clickAddToCart() {
        await expect(this.addToCartButton).toBeVisible({
            timeout: 30000
        });

        await this.addToCartButton.click();
    }
}

module.exports = ProductPage;