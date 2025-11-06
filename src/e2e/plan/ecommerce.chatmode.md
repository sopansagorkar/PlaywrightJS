# Swag Labs E-commerce Application - Test Plan

## Application Overview

Swag Labs is an e-commerce demo application that simulates a real-world shopping experience. The application includes:
- User Authentication with multiple user types
- Product Catalog Management
- Shopping Cart Functionality
- Checkout Process
- Order Confirmation

## Test Environment

- **Application URL**: https://www.saucedemo.com/
- **Framework**: Playwright
- **Pattern**: Page Object Model
- **Test Data Management**: External JSON files

## User Types Available

1. standard_user
2. locked_out_user
3. problem_user
4. performance_glitch_user
5. error_user
6. visual_user

All users share the common password: secret_sauce

## Test Scenarios

### 1. Authentication Testing

#### 1.1 Valid Login Scenarios
**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter username "standard_user"
3. Enter password "secret_sauce"
4. Click Login button

**Expected Results:**
- User successfully logs in
- Redirected to inventory page
- Product catalog is visible

#### 1.2 Invalid Login Scenarios
**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Test with combinations:
   - Invalid username/valid password
   - Valid username/invalid password
   - Empty username/password
   - Special characters in credentials

**Expected Results:**
- Appropriate error messages displayed
- User remains on login page
- Error message is clear and visible

#### 1.3 Locked User Testing
**Steps:**
1. Navigate to login page
2. Enter username "locked_out_user"
3. Enter password "secret_sauce"
4. Click Login button

**Expected Results:**
- Login denied
- Appropriate error message about locked account
- User remains on login page

### 2. Product Catalog Testing

#### 2.1 Product Display Verification
**Steps:**
1. Login as standard_user
2. Verify product catalog page

**Expected Results:**
- All products are displayed with images
- Product titles are visible
- Prices are displayed correctly
- Add to Cart buttons are present

#### 2.2 Sorting Functionality
**Steps:**
1. Login as standard_user
2. Click sort dropdown
3. Test all sorting options:
   - Name (A to Z)
   - Name (Z to A)
   - Price (low to high)
   - Price (high to low)

**Expected Results:**
- Products reorder correctly
- Sort maintains correct order after page refresh
- Visual feedback during sorting

### 3. Shopping Cart Testing

#### 3.1 Add to Cart Functionality
**Steps:**
1. Login as standard_user
2. Add multiple items to cart
3. Verify cart badge updates
4. Click cart icon

**Expected Results:**
- Items added successfully
- Cart badge shows correct count
- Cart icon is clearly visible
- Cart page shows all added items

#### 3.2 Remove from Cart
**Steps:**
1. Add items to cart
2. Remove items using:
   - Remove button on product page
   - Remove button in cart
3. Verify cart updates

**Expected Results:**
- Items removed successfully
- Cart badge updates correctly
- Remove button toggles to Add to Cart
- Cart total updates accurately

### 4. Checkout Process

#### 4.1 Checkout Information
**Steps:**
1. Add items to cart
2. Proceed to checkout
3. Enter shipping information:
   - First Name
   - Last Name
   - Postal Code
4. Click Continue

**Expected Results:**
- Form accepts valid input
- Validation on required fields
- Proper error messages for invalid input
- Success navigation to checkout overview

#### 4.2 Order Review
**Steps:**
1. Complete checkout information
2. Review order details
3. Verify:
   - Item total
   - Tax
   - Total amount
4. Click Finish

**Expected Results:**
- All costs calculated correctly
- Items list matches cart
- Shipping information displayed
- Payment information visible

#### 4.3 Order Confirmation
**Steps:**
1. Complete purchase
2. View confirmation page

**Expected Results:**
- Success message displayed
- Order confirmation number present
- Back Home button works
- Thank you message visible

### 5. Performance User Testing

#### 5.1 Performance Glitch User
**Steps:**
1. Login as performance_glitch_user
2. Perform standard shopping flow

**Expected Results:**
- Application responds slower but completes actions
- No functionality breaks
- Performance issues are consistent

### 6. Error Handling

#### 6.1 Problem User Testing
**Steps:**
1. Login as problem_user
2. Attempt standard shopping flow
3. Document any intentional errors

**Expected Results:**
- System handles errors gracefully
- Error messages are clear
- No system crashes
- User can continue or recover

### 7. Visual Testing

#### 7.1 Visual User Testing
**Steps:**
1. Login as visual_user
2. Navigate through all pages
3. Verify visual elements

**Expected Results:**
- UI elements render correctly
- Images load properly
- Layouts are consistent
- No visual glitches

## Test Data Requirements

1. **User Credentials:**
   - All user types listed above
   - Invalid credential combinations

2. **Shipping Information:**
   - Valid and invalid postal codes
   - Various name formats
   - Special characters in fields

3. **Payment Information:**
   - Multiple payment methods (if applicable)
   - Invalid payment scenarios

## Success Criteria

1. All test scenarios pass successfully
2. No critical or high-priority bugs
3. Performance meets acceptable standards:
   - Page load < 3 seconds
   - Transaction completion < 5 seconds
4. All error messages are clear and actionable
5. Visual consistency across browsers

## Notes

- Tests implemented using Playwright
- Page Object Model ensures maintainable code
- Data-driven approach with external test data
- Cross-browser testing recommended
- Mobile responsiveness testing required

## Reporting

Test results should include:
1. Test execution summary
2. Screenshots of failures
3. Performance metrics
4. Error logs
5. Test coverage report

This test plan provides comprehensive coverage of the Swag Labs e-commerce application, focusing on both functional and non-functional aspects of testing.