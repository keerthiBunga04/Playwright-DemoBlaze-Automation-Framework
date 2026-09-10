const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

const products = require('../fixtures/products.json');
const checkoutData = require('../fixtures/checkout.json');

const { acceptDialog } = require('../utils/Helper');

test('Verify complete end-to-end purchase flow', async ({ page }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Open DemoBlaze
    await homePage.openWebsite();

    // 2. Select product
    await productPage.selectProduct(products.mobile.name);

    // 3. Verify product details
    const productTitle = await productPage.getProductTitle();
    const productPrice = await productPage.getProductPrice();

    expect(productTitle).toContain(products.mobile.name);
    expect(productPrice).toContain(products.mobile.price);

    // 4. Add product to cart
    const dialogPromise = acceptDialog(page);

    await productPage.clickAddToCart();

    const dialogMessage = await dialogPromise;

    expect(dialogMessage).toContain('Product added');

    // 5. Open Cart
    await homePage.clickCart();

    // 6. Verify product is in Cart
    const productInCart = await cartPage.isProductInCart(
        products.mobile.name
    );

    expect(productInCart).toBeTruthy();

    // 7. Verify Cart total
    const totalPrice = await cartPage.getTotalPrice();

    expect(totalPrice).toBe(
        products.mobile.price.replace('$', '')
    );

    // 8. Open Checkout
    await cartPage.clickPlaceOrder();

    // 9. Verify Checkout modal
    await checkoutPage.verifyCheckoutModalVisible();

    // 10. Enter customer details
    await checkoutPage.enterCustomerDetails(
        checkoutData.customer.name,
        checkoutData.customer.country,
        checkoutData.customer.city,
        checkoutData.customer.card,
        checkoutData.customer.month,
        checkoutData.customer.year
    );

    // 11. Complete purchase
    await checkoutPage.clickPurchase();

    // 12. Verify purchase confirmation
    const confirmation =
        await checkoutPage.getPurchaseConfirmation();

    expect(confirmation).toContain(
        'Thank you for your purchase!'
    );
});