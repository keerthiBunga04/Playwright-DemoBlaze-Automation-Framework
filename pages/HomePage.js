class HomePage {

    constructor(page) {
        this.page = page;

        // Locators
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.cartLink = page.locator('#cartur');
    }

    // Methods
    async openWebsite() {
        await this.page.goto('/');
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickSignUp() {
        await this.signUpLink.click();
    }

    async clickCart() {
        await Promise.all([
            this.page.waitForURL('**/cart.html', {
                waitUntil: 'commit'
            }),
            this.cartLink.click()
        ]);
    }
}

module.exports = HomePage;