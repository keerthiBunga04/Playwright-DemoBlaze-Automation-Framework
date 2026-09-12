const { test, expect } = require('../fixtures/test-fixtures');

const users = require('../fixtures/users.json');
const messages = require('../fixtures/messages.json');

test(
    'Verify user can login',
    async ({
        page,
        homePage,
        loginPage
    }) => {

        await homePage.openWebsite();

        await homePage.clickLogin();

        await expect(
            page.locator('#logInModal')
        ).toBeVisible();

        await loginPage.login(
            users.validUser.username,
            users.validUser.password
        );

        const isLoggedIn =
            await loginPage.isUserLoggedIn();

        expect(isLoggedIn).toBeTruthy();
    }
);

test(
    'Verify login fails with invalid credentials',
    async ({
        page,
        homePage,
        loginPage
    }) => {

        await homePage.openWebsite();

        await homePage.clickLogin();

        await expect(
            page.locator('#logInModal')
        ).toBeVisible();

        const dialogMessage =
            await loginPage.attemptLogin(
                users.invalidUser.username,
                users.invalidUser.password
            );

        expect(dialogMessage).toContain(
            messages.invalidLogin
        );
    }
);

test(
    'Verify login fails when username and password are empty',
    async ({
        page,
        homePage,
        loginPage
    }) => {

        await homePage.openWebsite();

        await homePage.clickLogin();

        await expect(
            page.locator('#logInModal')
        ).toBeVisible();

        const dialogMessage =
            await loginPage.attemptLogin(
                users.emptyUser.username,
                users.emptyUser.password
            );

        expect(dialogMessage).toContain(
            messages.emptyLogin
        );
    }
);