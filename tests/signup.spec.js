const { test, expect } = require('../fixtures/test-fixtures');

const {
    generateUsername,
    generatePassword
} = require('../utils/RandomData');

const { acceptDialog } = require('../utils/Helper');

const messages = require('../fixtures/messages.json');


// Positive Test
test(
    'Verify user can sign up successfully @smoke @regression',
    async ({
        page,
        homePage,
        signupPage
    }) => {

        await homePage.openWebsite();

        await homePage.clickSignUp();

        await expect(
            page.locator('#signInModal')
        ).toBeVisible();

        const username = generateUsername();
        const password = generatePassword();

        await signupPage.fillSignupForm(
            username,
            password
        );

        const dialogMessagePromise = acceptDialog(page);

        await signupPage.clickSignUpButton();

        const dialogMessage =
            await dialogMessagePromise;

        console.log(
            'Dialog Message:',
            dialogMessage
        );

        expect(dialogMessage).toContain(
            'Sign up successful'
        );
    }
);


// Negative Test - Duplicate Username
test(
    'Verify signup fails with duplicate username @negative @regression',
    async ({
        page,
        homePage,
        signupPage
    }) => {

        await homePage.openWebsite();

        await homePage.clickSignUp();

        await expect(
            page.locator('#signInModal')
        ).toBeVisible();

        const dialogMessage =
            await signupPage.attemptSignup(
                'Ketty',
                'kettykeerthi'
            );

        expect(dialogMessage).toContain(
            messages.duplicateSignup
        );
    }
);


// Negative Test - Empty Credentials
test(
    'Verify signup fails when username and password are empty @negative @regression',
    async ({
        page,
        homePage,
        signupPage
    }) => {

        await homePage.openWebsite();

        await homePage.clickSignUp();

        await expect(
            page.locator('#signInModal')
        ).toBeVisible();

        const dialogMessage =
            await signupPage.attemptSignup(
                '',
                ''
            );

        expect(dialogMessage).toContain(
            messages.emptySignup
        );
    }
);