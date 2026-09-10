const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.usernameTextBox = page.locator('#loginusername');
        this.passwordTextBox = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
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

    // Click login button
    async clickLoginButton() {
        await this.loginButton.click();
    }

    // Login
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    // Get welcome message
    async getWelcomeMessage() {
        return await this.welcomeMessage.textContent();
    }

    // Check if user is logged in
    async isUserLoggedIn() {
        await this.welcomeMessage.waitFor({ state: 'visible' });
        return true;
    }

}

module.exports = LoginPage;