class ProductPage {

    constructor(page) {
        this.page = page;

        // Product Details
        this.productTitle = page.locator('.name');
        this.productPrice = page.locator('.price-container');

        // Add To Cart
        this.addToCartButton = page.getByRole('link', {
            name: 'Add to cart'
        });
    }

    // Select Any Product
    async selectProduct(productName) {
        await this.page
            .getByRole('link', { name: productName })
            .click();
    }

    // Product Title
    async getProductTitle() {
        return await this.productTitle.textContent();
    }

    // Product Price
    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    // Add To Cart
    async clickAddToCart() {
        await this.addToCartButton.click();
    }

}

module.exports = ProductPage;