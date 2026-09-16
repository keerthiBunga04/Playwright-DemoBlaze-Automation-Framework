const { test, expect } = require('../fixtures/test-fixtures');

const products = require('../fixtures/products.json');
const checkoutData = require('../fixtures/checkout.json');
const { acceptDialog } = require('../utils/Helper');

test(
  'Verify user can complete checkout successfully @smoke @regression @e2e',
  async ({ page, homePage, productPage, cartPage, checkoutPage }) => {
    // Open website
    await homePage.openWebsite();

    // Select product
    await productPage.selectProduct(products.mobile.name);

    // Add product to cart and handle browser dialog
    const [dialogMessage] = await Promise.all([
      acceptDialog(page),
      productPage.clickAddToCart()
    ]);

    expect(dialogMessage).toContain('Product added');

    // Navigate to cart
    await homePage.clickCart();

    // Verify product is present in cart
    const productInCart = await cartPage.isProductInCart(
      products.mobile.name
    );

    expect(productInCart).toBeTruthy();

    // Open checkout modal
    await cartPage.clickPlaceOrder();
    await checkoutPage.verifyCheckoutModalVisible();

    // Enter customer details
    await checkoutPage.enterCustomerDetails(
      checkoutData.customer.name,
      checkoutData.customer.country,
      checkoutData.customer.city,
      checkoutData.customer.card,
      checkoutData.customer.month,
      checkoutData.customer.year
    );

    // Complete purchase
    await checkoutPage.clickPurchase();

    // Verify purchase confirmation
    const confirmation = await checkoutPage.getPurchaseConfirmation();

    expect(confirmation).toContain('Thank you for your purchase!');
  }
);