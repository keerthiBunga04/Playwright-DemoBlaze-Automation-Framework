const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

const products = require('../fixtures/products.json');
const checkoutData = require('../fixtures/checkout.json');

const { acceptDialog } = require('../utils/Helper');

test('Verify user can complete checkout successfully', async ({ page }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Open DemoBlaze
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

    // Open Checkout
    await cartPage.clickPlaceOrder();

    // Verify Checkout modal
    await checkoutPage.verifyCheckoutModalVisible();

    // Enter customer details
    await checkoutPage.enterCustomerDetails(
        checkoutData.customer.name,
        checkoutData.customer.country,
        checkoutData.customer.city,
        checkoutData.customer.card,
        checkoutData.customer.month,
        checkoutData.customer.year
    );

    // Purchase
    await checkoutPage.clickPurchase();

    // Verify purchase confirmation
    const confirmation = await checkoutPage.getPurchaseConfirmation();

    expect(confirmation).toContain('Thank you for your purchase!');
});