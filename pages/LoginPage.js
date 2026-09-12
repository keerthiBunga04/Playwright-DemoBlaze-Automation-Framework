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
        await this.usernameTextBox.fill(username);
    }

    async enterPassword(password) {
        await this.passwordTextBox.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();

        await this.loginModal.waitFor({
            state: 'hidden'
        });
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async attemptLogin(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);

        await expect(this.loginModal).toBeVisible();

        const dialogMessagePromise = new Promise(resolve => {
            this.page.once('dialog', async dialog => {
                const message = dialog.message();

                await dialog.accept();

                resolve(message);
            });
        });

        await this.page.evaluate(() => {
            const button = document.querySelector(
                '#logInModal button[onclick="logIn()"]'
            );

            if (!button) {
                throw new Error(
                    'Login button was not found in the login modal'
                );
            }

            button.click();
        });

        return await dialogMessagePromise;
    }

    async getWelcomeMessage() {
        return await this.welcomeMessage.textContent();
    }

    async isUserLoggedIn() {
        await this.welcomeMessage.waitFor({
            state: 'visible'
        });

        return true;
    }
}

module.exports = LoginPage;