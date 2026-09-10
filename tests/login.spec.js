const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');

const users = require('../fixtures/users.json');

test('Verify user can login', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.openWebsite();

    await homePage.clickLogin();

    await expect(page.locator('#logInModal')).toBeVisible();

    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    const isLoggedIn = await loginPage.isUserLoggedIn();

    expect(isLoggedIn).toBeTruthy();

});