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
    await this.nameTextBox.fill(String(name));
    await this.countryTextBox.fill(String(country));
    await this.cityTextBox.fill(String(city));

    // Use keyboard input for fields that intermittently lose values
    await this.cardTextBox.click();
    await this.cardTextBox.fill('');
    await this.cardTextBox.pressSequentially(String(card));
    await this.cardTextBox.press('Tab');

    await this.monthTextBox.fill(String(month));

    await this.yearTextBox.click();
    await this.yearTextBox.fill('');
    await this.yearTextBox.pressSequentially(String(year));
    await this.yearTextBox.press('Tab');

    // Validate entered values
    await expect(this.nameTextBox).toHaveValue(String(name));
    await expect(this.countryTextBox).toHaveValue(String(country));
    await expect(this.cityTextBox).toHaveValue(String(city));
    await expect(this.cardTextBox).toHaveValue(String(card));
    await expect(this.monthTextBox).toHaveValue(String(month));
    await expect(this.yearTextBox).toHaveValue(String(year));
}

    // Click Purchase
    async clickPurchase() {
        await this.purchaseButton.click();
    }

    // Get Purchase Confirmation
    async getPurchaseConfirmation() {

        await this.purchaseConfirmation.waitFor({
            state: 'visible'
        });

        return await this.purchaseConfirmation.textContent();
    }
}

module.exports = CheckoutPage;