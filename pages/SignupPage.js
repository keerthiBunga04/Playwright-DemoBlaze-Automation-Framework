class SignupPage {

    constructor(page) {
        this.page = page;

        this.usernameTextBox = page.locator('#sign-username');
        this.passwordTextBox = page.locator('#sign-password');
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
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

}

module.exports = SignupPage;

