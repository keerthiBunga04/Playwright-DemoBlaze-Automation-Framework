const { test, expect } = require('../fixtures/test-fixtures');

const { acceptDialog } = require('../utils/Helper');

test(
    'Verify complete end-to-end purchase flow @e2e @smoke @regression',
    async ({
        page,
        homePage,
        productPage,
        cartPage,
        checkoutPage,
        testData
    }) => {

        const product = testData.products.mobile;
        const customer = testData.checkout.customer;

        await homePage.openWebsite();

        await productPage.selectProduct(product.name);

        const productTitle =
            await productPage.getProductTitle();

        const productPrice =
            await productPage.getProductPrice();

        expect(productTitle).toContain(product.name);

        expect(productPrice).toContain(product.price);

        const [dialogMessage] = await Promise.all([
            acceptDialog(page),
            productPage.clickAddToCart()
        ]);

        expect(dialogMessage).toContain('Product added');

        await homePage.clickCart();

        const productInCart =
            await cartPage.isProductInCart(product.name);

        expect(productInCart).toBeTruthy();

        const totalPrice =
            await cartPage.getTotalPrice();

        expect(totalPrice).toBe(
            product.price.replace('$', '')
        );

        await cartPage.clickPlaceOrder();

        await checkoutPage.verifyCheckoutModalVisible();

        await checkoutPage.enterCustomerDetails(
            customer.name,
            customer.country,
            customer.city,
            customer.card,
            customer.month,
            customer.year
        );

        await checkoutPage.clickPurchase();

        const confirmation =
            await checkoutPage.getPurchaseConfirmation();

        expect(confirmation).toContain(
            'Thank you for your purchase!'
        );
    }
);