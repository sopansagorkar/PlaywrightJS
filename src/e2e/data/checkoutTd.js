module.exports = {
    locators: [
        {'key': 'verifyCart', 'value': '//span[contains(text(),"Your Cart")]'},
        {'key': 'verifyQTY', 'value': '//div[contains(text(),"QTY")]'},
        {'key': 'verifyDesc', 'value': '//div[contains(text(),"Description")]'},
        {'key': 'checkoutBtn', 'value': '//*[@id="checkout"]'},
        {'key': 'firstNameTxt', 'value': '//*[@id="first-name"]'},
        {'key': 'lastNameTxt', 'value': '//*[@id="last-name"]'},
        {'key': 'zipTxt', 'value': '//*[@id="postal-code"]'},
        {'key': 'continue', 'value': '//*[@id="continue"]'},
        {'key': 'paymentInfo', 'value': '//div[contains(text(),"Payment Information")]'},
        {'key': 'shippingInfo', 'value': '//div[contains(text(),"Shipping Information")]'},
        {'key': 'totalPrice', 'value': '//div[contains(text(),"Price Total")]'},
        {'key': 'finish', 'value': '//*[@id="finish"]'},
        {'key': 'completeOrder', 'value': '//h2[@class="complete-header"]'},
        
    ],

    data: [
        {'key': 'firstName', 'value': 'Sopan'},
        {'key': 'lastName', 'value': 'Sagorkar'},
        {'key': 'zip', 'value': '411014'},
    ],
};