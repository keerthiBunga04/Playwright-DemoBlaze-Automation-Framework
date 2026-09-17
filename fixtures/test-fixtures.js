const base = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const messagesData = require('./messages.json');
const usersData = require('./users.json');
const productsData = require('./products.json');

const checkoutData = require('./checkout.json');

const test = base.test.extend({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    testData: async ({ }, use) => {
        await use({
            checkout: checkoutData,
            users: usersData,
            products: productsData,
            messages: messagesData
        });
    },

});

module.exports = {
    test,
    expect: base.expect
};