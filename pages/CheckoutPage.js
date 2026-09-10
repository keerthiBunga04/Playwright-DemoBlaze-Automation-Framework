const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;

        // Checkout Modal
        this.checkoutModal = page.locator('#orderModal');

        // Customer Details
        this.nameTextBox = page.locator('#name');
        this.countryTextBox = page.locator('#country');
        this.cityTextBox = page.locator('#city');
        this.cardTextBox = page.locator('#card');
        this.monthTextBox = page.locator('#month');
        this.yearTextBox = page.locator('#year');

        // Purchase
        this.purchaseButton = page.getByRole('button', {
            name: 'Purchase'
        });

        // Purchase Confirmation
        this.purchaseConfirmation = page.locator('.sweet-alert h2');
    }

    // Verify Checkout Modal
    async verifyCheckoutModalVisible() {
        await expect(this.checkoutModal).toBeVisible();
    }

    // Enter Customer Details
    async enterCustomerDetails(
        name,
        country,
        city,
        card,
        month,
        year
    ) {
        await this.nameTextBox.fill(name);
        await this.countryTextBox.fill(country);
        await this.cityTextBox.fill(city);
        await this.cardTextBox.fill(card);
        await this.monthTextBox.fill(month);
        await this.yearTextBox.fill(year);
    }

    // Click Purchase
    async clickPurchase() {
        await this.purchaseButton.click();
    }

    // Get Purchase Confirmation
    async getPurchaseConfirmation() {
        return await this.purchaseConfirmation.textContent();
    }
}

module.exports = CheckoutPage;