const { expect } = require('@playwright/test');

class SignupPage {
    constructor(page) {
        this.page = page;

        this.signupModal = page.locator('#signInModal');

        this.usernameTextBox = page.locator('#sign-username');
        this.passwordTextBox = page.locator('#sign-password');

        this.signUpButton = page.getByRole('button', {
            name: 'Sign up',
            exact: true
        });
    }

    async enterUsername(username) {
        const value = String(username);

        await expect(this.usernameTextBox).toBeVisible();

        await this.usernameTextBox.click();
        await this.usernameTextBox.fill('');
        await this.usernameTextBox.pressSequentially(value);

        await expect(this.usernameTextBox).toHaveValue(value);
    }

    async enterPassword(password) {
        const value = String(password);

        await expect(this.passwordTextBox).toBeVisible();

        await this.passwordTextBox.click();
        await this.passwordTextBox.fill('');
        await this.passwordTextBox.pressSequentially(value);

        await expect(this.passwordTextBox).toHaveValue(value);
    }

    async fillSignupForm(username, password) {
        await expect(this.signupModal).toBeVisible();

        await this.enterUsername(username);
        await this.enterPassword(password);

        // Final verification before signup
        await expect(this.usernameTextBox).toHaveValue(String(username));
        await expect(this.passwordTextBox).toHaveValue(String(password));
    }

    async clickSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await this.signUpButton.click();
    }

    async attemptSignup(username, password) {
        await expect(this.signupModal).toBeVisible();

        await this.enterUsername(username);
        await this.enterPassword(password);

        const dialogPromise = new Promise(resolve => {
            this.page.once('dialog', async dialog => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });

        await this.signUpButton.click();

        return await dialogPromise;
    }
}

module.exports = SignupPage;