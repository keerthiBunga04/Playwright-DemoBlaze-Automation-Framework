const { test, expect } = require('../fixtures/test-fixtures');
const { acceptDialog } = require('../utils/Helper');

test.describe('Login Functionality', () => {

    test(
        'Verify user can login @smoke @regression',
        async ({ page, homePage, loginPage, testData }) => {
            const user = testData.users.validUser;

            // Open website
            await homePage.openWebsite();

            // Open login modal
            await homePage.clickLogin();

            // Login with valid credentials
            await loginPage.login(
                user.username,
                user.password
            );

            // Verify successful login
            const welcomeMessage = await loginPage.getWelcomeMessage();

            expect(welcomeMessage).toContain(user.username);
        }
    );


    test(
        'Verify login fails with invalid credentials @negative @regression',
        async ({ page, homePage, loginPage, testData }) => {
            const user = testData.users.invalidUser;

            // Open website
            await homePage.openWebsite();

            // Open login modal
            await homePage.clickLogin();

            // Attempt login with invalid credentials
            const dialogMessage = await loginPage.attemptLogin(
                user.username,
                user.password
            );

            // Verify error dialog
            expect(dialogMessage).toContain('Wrong password');
        }
    );


    test(
        'Verify login fails when username and password are empty @negative @regression',
        async ({ page, homePage, loginPage, testData }) => {
            const user = testData.users.emptyUser;

            // Open website
            await homePage.openWebsite();

            // Open login modal
            await homePage.clickLogin();

            // Attempt login with empty credentials
            const dialogMessage = await loginPage.attemptLogin(
                user.username,
                user.password
            );

            // Verify error dialog
            expect(dialogMessage).toContain('Please fill out Username and Password.');
        }
    );

});