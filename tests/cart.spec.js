const { test, expect } = require('../fixtures/test-fixtures');

const products = require('../fixtures/products.json');

const { acceptDialog } = require('../utils/Helper');


test(
    'Verify product is added to cart successfully @smoke @regression',
    async ({
        page,
        homePage,
        productPage,
        cartPage
    }) => {

        await homePage.openWebsite();

        await productPage.selectProduct(
            products.mobile.name
        );

        const [dialogMessage] = await Promise.all([
            acceptDialog(page),
            productPage.clickAddToCart()
        ]);

        expect(dialogMessage).toContain(
            'Product added'
        );

        await homePage.clickCart();

        const productInCart =
            await cartPage.isProductInCart(
                products.mobile.name
            );

        expect(productInCart).toBeTruthy();
    }
);