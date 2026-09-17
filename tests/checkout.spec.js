const { test, expect } = require('../fixtures/test-fixtures');


const { acceptDialog } = require('../utils/Helper');

test(
  'Verify user can complete checkout successfully @smoke @regression @e2e',
  async ({
    page,
    homePage,
    productPage,
    cartPage,
    checkoutPage,
    testData
  }) => {
    // Open website
    await homePage.openWebsite();

    // Select product
    await productPage.selectProduct(testData.products.mobile.name);

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
      testData.products.mobile.name
    );

    expect(productInCart).toBeTruthy();

    // Open checkout modal
    await cartPage.clickPlaceOrder();
    await checkoutPage.verifyCheckoutModalVisible();

    // Enter customer details from fixture data
    const customer = testData.checkout.customer;

    await checkoutPage.enterCustomerDetails(
      customer.name,
      customer.country,
      customer.city,
      customer.card,
      customer.month,
      customer.year
    );

    // Complete purchase
    await checkoutPage.clickPurchase();

    // Verify purchase confirmation
    const confirmation = await checkoutPage.getPurchaseConfirmation();

    expect(confirmation).toContain('Thank you for your purchase!');
  }
);