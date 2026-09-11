class ProductPage {

    constructor(page) {
        this.page = page;

        // Product Details
        this.productTitle = page.locator('h2.name');
        this.productPrice = page.locator('.price-container');

        // Add To Cart
        this.addToCartButton = page.getByRole('link', {
            name: 'Add to cart',
            exact: true
        });
    }

    // Select Any Product
    async selectProduct(productName) {

        const productLink = this.page.getByRole('link', {
            name: productName,
            exact: true
        });

        await productLink.waitFor({
            state: 'visible'
        });

        await productLink.click();

        // Wait for product details page to become available
        await this.productTitle.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.addToCartButton.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // Get Product Title
    async getProductTitle() {
        return await this.productTitle.textContent();
    }

    // Get Product Price
    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    // Add Product To Cart
    async clickAddToCart() {
        await this.addToCartButton.click();
    }
}

module.exports = ProductPage;