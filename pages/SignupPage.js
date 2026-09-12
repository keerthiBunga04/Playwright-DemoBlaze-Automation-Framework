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
        await this.usernameTextBox.fill(username);
    }

    async enterPassword(password) {
        await this.passwordTextBox.fill(password);
    }

    async fillSignupForm(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async attemptSignup(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);

        const dialogMessagePromise = new Promise(resolve => {
            this.page.once('dialog', async dialog => {
                const message = dialog.message();

                await dialog.accept();

                resolve(message);
            });
        });

        await this.page.evaluate(() => {
            const button = document.querySelector(
                '#signInModal button[onclick="register()"]'
            );

            if (!button) {
                throw new Error(
                    'Signup button was not found in the signup modal'
                );
            }

            button.click();
        });

        return await dialogMessagePromise;
    }
}

module.exports = SignupPage;