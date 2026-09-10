const { test, expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const SignupPage = require('../pages/SignupPage');

const {
    generateUsername,
    generatePassword
} = require('../utils/RandomData');

const { acceptDialog } = require('../utils/Helper');

test('Verify user can sign up successfully', async ({ page }) => {

    // Create Page Objects
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    // Open Website
    await homePage.openWebsite();

    // Click Sign Up
    await homePage.clickSignUp();

    // Verify Sign Up Modal
    await expect(page.locator('#signInModal')).toBeVisible();

    // Generate Dynamic Test Data
    const username = generateUsername();
    const password = generatePassword();

    // Fill Sign Up Form
    await signupPage.fillSignupForm(username, password);

    // Listen for Dialog
    const dialogPromise = acceptDialog(page);

    // Click Sign Up Button
    await signupPage.clickSignUpButton();

    // Capture Dialog Message
    const dialogMessage = await dialogPromise;

    console.log("Dialog Message:", dialogMessage);

    // Verify Successful Sign Up
    expect(dialogMessage).toContain("Sign up successful");

});