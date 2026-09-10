const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');

const products = require('../fixtures/products.json');

const { acceptDialog } = require('../utils/Helper');

test('Verify Product Details and Add Product to Cart', async ({ page }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.openWebsite();

    await productPage.selectProduct(products.mobile.name);

    expect(await productPage.getProductTitle())
        .toContain(products.mobile.name);

    expect(await productPage.getProductPrice())
        .toContain(products.mobile.price);

    const dialogPromise = acceptDialog(page);

    await productPage.clickAddToCart();

    const dialogMessage = await dialogPromise;

    expect(dialogMessage)
        .toContain("Product added");

});