const { test, expect } = require('../fixtures/test-fixtures');

const products = require('../fixtures/products.json');
const checkoutData = require('../fixtures/checkout.json');

const { acceptDialog } = require('../utils/Helper');


test(
    'Verify complete end-to-end purchase flow @e2e @smoke @regression',
    async ({
        page,
        homePage,
        productPage,
        cartPage,
        checkoutPage
    }) => {

        await homePage.openWebsite();

        await productPage.selectProduct(
            products.mobile.name
        );

        const productTitle =
            await productPage.getProductTitle();

        const productPrice =
            await productPage.getProductPrice();

        expect(productTitle).toContain(
            products.mobile.name
        );

        expect(productPrice).toContain(
            products.mobile.price
        );

        const dialogPromise = acceptDialog(page);

        await productPage.clickAddToCart();

        const dialogMessage =
            await dialogPromise;

        expect(dialogMessage).toContain(
            'Product added'
        );

        await homePage.clickCart();

        const productInCart =
            await cartPage.isProductInCart(
                products.mobile.name
            );

        expect(productInCart).toBeTruthy();

        const totalPrice =
            await cartPage.getTotalPrice();

        expect(totalPrice).toBe(
            products.mobile.price.replace('$', '')
        );

        await cartPage.clickPlaceOrder();

        await checkoutPage.verifyCheckoutModalVisible();

        await checkoutPage.enterCustomerDetails(
            checkoutData.customer.name,
            checkoutData.customer.country,
            checkoutData.customer.city,
            checkoutData.customer.card,
            checkoutData.customer.month,
            checkoutData.customer.year
        );

        await checkoutPage.clickPurchase();

        const confirmation =
            await checkoutPage.getPurchaseConfirmation();

        expect(confirmation).toContain(
            'Thank you for your purchase!'
        );
    }
);