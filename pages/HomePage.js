const { BASE_URL } = require('../utils/Constants');

class HomePage {

    constructor(page) {
        this.page = page;

        // Locators
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
    }

    // Methods
    async openWebsite() {
        await this.page.goto('https://www.demoblaze.com');
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickSignUp() {
        await this.signUpLink.click();
    }

    async clickCart() {
        await this.cartLink.click();
    }
}

module.exports = HomePage;