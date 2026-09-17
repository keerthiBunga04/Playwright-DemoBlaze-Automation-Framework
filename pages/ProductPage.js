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

        await productLink.waitFor({
            state: 'visible',
            timeout: 15000
        });

        // Click product and wait for product-page navigation
        await Promise.all([
            this.page.waitForURL(/prod\.html\?idp_=\d+/, {
                waitUntil: 'commit',
                timeout: 30000
            }),
            productLink.click()
        ]);

        // Verify product details page is loaded
        await this.productTitle.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.addToCartButton.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // Get product title
    async getProductTitle() {
        return await this.productTitle.textContent();
    }

    // Get product price
    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    // Click Add to Cart
    async clickAddToCart() {
        await this.addToCartButton.click();
    }
}

module.exports = ProductPage;