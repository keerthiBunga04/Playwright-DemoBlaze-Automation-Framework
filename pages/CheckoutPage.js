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
        await expect(this.checkoutModal).toBeVisible({
            timeout: 15000
        });
    }

    async enterCustomerDetails(name, country, city, card, month, year) {
        await this.verifyCheckoutModalVisible();

        // Wait for the form fields to be ready
        await expect(this.nameTextBox).toBeVisible();
        await expect(this.countryTextBox).toBeVisible();
        await expect(this.cityTextBox).toBeVisible();
        await expect(this.cardTextBox).toBeVisible();
        await expect(this.monthTextBox).toBeVisible();
        await expect(this.yearTextBox).toBeVisible();

        // Name
        await this.nameTextBox.click();
        await this.nameTextBox.fill(String(name));
        await expect(this.nameTextBox).toHaveValue(String(name));

        // Country
        await this.countryTextBox.click();
        await this.countryTextBox.fill(String(country));
        await expect(this.countryTextBox).toHaveValue(String(country));

        // City
        await this.cityTextBox.click();
        await this.cityTextBox.fill(String(city));
        await expect(this.cityTextBox).toHaveValue(String(city));

        // Card
        await this.cardTextBox.click();
        await this.cardTextBox.fill(String(card));
        await expect(this.cardTextBox).toHaveValue(String(card));

        // Month
        await this.monthTextBox.click();
        await this.monthTextBox.fill(String(month));
        await expect(this.monthTextBox).toHaveValue(String(month));

        // Year
        await this.yearTextBox.click();
        await this.yearTextBox.fill(String(year));
        await expect(this.yearTextBox).toHaveValue(String(year));
    }

    async clickPurchase() {
        await expect(this.purchaseButton).toBeVisible();
        await this.purchaseButton.click();
    }

    async getPurchaseConfirmation() {
        await expect(this.purchaseConfirmation).toBeVisible({
            timeout: 15000
        });

        return await this.purchaseConfirmation.textContent();
    }
}

module.exports = CheckoutPage;