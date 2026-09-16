const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        this.loginModal = page.locator('#logInModal');
        this.usernameTextBox = page.locator('#loginusername');
        this.passwordTextBox = page.locator('#loginpassword');

        this.loginButton = page.getByRole('button', {
            name: 'Log in',
            exact: true
        });

        this.welcomeMessage = page.locator('#nameofuser');
    }

    async enterUsername(username) {
        await expect(this.usernameTextBox).toBeVisible();

        await this.usernameTextBox.click();
        await this.usernameTextBox.fill('');
        await this.usernameTextBox.pressSequentially(String(username));

        await expect(this.usernameTextBox).toHaveValue(String(username));
    }

    async enterPassword(password) {
        await expect(this.passwordTextBox).toBeVisible();

        await this.passwordTextBox.click();
        await this.passwordTextBox.fill('');
        await this.passwordTextBox.pressSequentially(String(password));

        await expect(this.passwordTextBox).toHaveValue(String(password));
    }

    async login(username, password) {
        await expect(this.loginModal).toBeVisible();

        await this.enterUsername(username);
        await this.enterPassword(password);

        await this.loginButton.click();

        // Wait until successful login is reflected in the navigation bar
        await expect(this.welcomeMessage).toBeVisible({
            timeout: 15000
        });
    }

    async attemptLogin(username, password) {
        await expect(this.loginModal).toBeVisible();

        await this.enterUsername(username);
        await this.enterPassword(password);

        const dialogPromise = new Promise(resolve => {
            this.page.once('dialog', async dialog => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });

        await this.loginButton.click();

        return await dialogPromise;
    }

    async getWelcomeMessage() {
        await expect(this.welcomeMessage).toBeVisible({
            timeout: 15000
        });

        return await this.welcomeMessage.textContent();
    }

    async isUserLoggedIn() {
        await expect(this.welcomeMessage).toBeVisible({
            timeout: 15000
        });

        return true;
    }
}

module.exports = LoginPage;