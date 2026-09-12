const { test, expect } = require('../fixtures/test-fixtures');

const users = require('../fixtures/users.json');

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