const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

const products = require('../fixtures/products.json');

const { acceptDialog } = require('../utils/Helper');

test('Verify product can be added to cart', async ({ page }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.openWebsite();

    // Select product
    await productPage.selectProduct(products.mobile.name);

    // Handle "Product added" dialog
    const dialogPromise = acceptDialog(page);

    await productPage.clickAddToCart();

    const dialogMessage = await dialogPromise;

    expect(dialogMessage).toContain('Product added');

    // Open Cart
    await homePage.clickCart();

    // Verify product is in cart
    const productInCart = await cartPage.isProductInCart(
        products.mobile.name
    );

    expect(productInCart).toBeTruthy();

    // Verify cart total
    const totalPrice = await cartPage.getTotalPrice();

    expect(totalPrice).toBe(products.mobile.price.replace('$', ''));

});