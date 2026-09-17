const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;

        this.loginLink = page.getByRole('link', {
            name: 'Log in'
        });

        this.signUpLink = page.getByRole('link', {
            name: 'Sign up'
        });

        this.cartLink = page.locator('#cartur');

        this.navigationBar = page.locator('nav');
    }

    async openWebsite() {
        await this.page.goto('/', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });

        await expect(this.navigationBar).toBeVisible({
            timeout: 15000
        });
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