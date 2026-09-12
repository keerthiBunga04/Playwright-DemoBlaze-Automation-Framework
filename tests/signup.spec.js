const { test, expect } = require('../fixtures/test-fixtures');

const {
    generateUsername,
    generatePassword
} = require('../utils/RandomData');

const { acceptDialog } = require('../utils/Helper');

test(
    'Verify user can sign up successfully',
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