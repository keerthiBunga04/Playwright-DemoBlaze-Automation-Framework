const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.checkoutModal = page.locator('#orderModal');

        this.nameTextBox = page.locator('#name');
        this.countryTextBox = page.locator('#country');
        this.cityTextBox = page.locator('#city');
        this.cardTextBox = page.locator('#card');
        this.monthTextBox = page.locator('#month');
        this.yearTextBox = page.locator('#year');

        this.purchaseButton = page.getByRole('button', {
            name: 'Purchase'
        });

        this.purchaseConfirmation = page.locator('.sweet-alert h2');
    }

    async verifyCheckoutModalVisible() {
        await expect(this.checkoutModal).toBeVisible();
    }

    async enterCustomerDetails(name, country, city, card, month, year) {
        await expect(this.checkoutModal).toBeVisible();

        // Name
        await this.nameTextBox.click();
        await this.nameTextBox.fill('');
        await this.nameTextBox.pressSequentially(String(name));
        await expect(this.nameTextBox).toHaveValue(String(name));

        // Country
        await this.countryTextBox.click();
        await this.countryTextBox.fill('');
        await this.countryTextBox.pressSequentially(String(country));
        await this.countryTextBox.press('Tab');
        await expect(this.countryTextBox).toHaveValue(String(country));

        // City
        await this.cityTextBox.click();
        await this.cityTextBox.fill('');
        await this.cityTextBox.pressSequentially(String(city));
        await expect(this.cityTextBox).toHaveValue(String(city));

        // Card
        await this.cardTextBox.click();
        await this.cardTextBox.fill('');
        await this.cardTextBox.pressSequentially(String(card));
        await this.cardTextBox.press('Tab');
        await expect(this.cardTextBox).toHaveValue(String(card));

        // Month
        await this.monthTextBox.click();
        await this.monthTextBox.fill('');
        await this.monthTextBox.pressSequentially(String(month));
        await expect(this.monthTextBox).toHaveValue(String(month));

        // Year
        await this.yearTextBox.click();
        await this.yearTextBox.fill('');
        await this.yearTextBox.pressSequentially(String(year));
        await this.yearTextBox.press('Tab');
        await expect(this.yearTextBox).toHaveValue(String(year));
    }

    async clickPurchase() {
        await expect(this.purchaseButton).toBeVisible();
        await this.purchaseButton.click();
    }

    async getPurchaseConfirmation() {
        await this.purchaseConfirmation.waitFor({
            state: 'visible'
        });

        return await this.purchaseConfirmation.textContent();
    }
}

module.exports = CheckoutPage;