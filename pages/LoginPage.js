const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;

        // Login Form Locators
        this.usernameTextBox = page.locator('#loginusername');
        this.passwordTextBox = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', {
            name: 'Log in'
        });

        // Login Modal
        this.loginModal = page.locator('#logInModal');

        // Successful Login
        this.welcomeMessage = page.locator('#nameofuser');
    }

    // Enter username
    async enterUsername(username) {
        await this.usernameTextBox.fill(username);
    }

    // Enter password
    async enterPassword(password) {
        await this.passwordTextBox.fill(password);
    }

    // Click Login button and wait for modal to close
    async clickLoginButton() {
        await this.loginButton.click();

        await this.loginModal.waitFor({
            state: 'hidden'
        });
    }

    // Complete login flow
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    // Get welcome message
    async getWelcomeMessage() {
        return await this.welcomeMessage.textContent();
    }

    // Verify user is logged in
    async isUserLoggedIn() {
        await this.welcomeMessage.waitFor({
            state: 'visible'
        });

        return true;
    }
}

module.exports = LoginPage;