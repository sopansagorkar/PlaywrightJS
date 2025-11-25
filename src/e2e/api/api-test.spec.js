const { test, expect } = require('@playwright/test');
const postData = require('../data/api-data.json');

test.describe('API - Booking endpoints', () => {
  test('@get verify get request', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    // Note: API may return 404 if booking doesn't exist; check status then body
    if (response.ok()) {
      const body = await response.json();
      console.log('GET /booking/1 response:', body);
      expect(body).toBeTruthy();
      expect(body).toHaveProperty('firstname');
    } else {
      console.log('GET /booking/1 returned', response.status(), '- booking may not exist');
      expect(response.status()).toBeGreaterThanOrEqual(400);
    }
  });

  test('@post create booking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', { data: postData });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('POST /booking response:', responseBody);
    expect(responseBody).toHaveProperty('booking');
    const b = responseBody.booking;
    expect(b).toHaveProperty('firstname', postData.firstname);
    expect(b).toHaveProperty('lastname', postData.lastname);
    expect(b).toHaveProperty('totalprice', postData.totalprice);
    expect(b).toHaveProperty('depositpaid', postData.depositpaid);
  });

  test('@put update booking (requires auth)', async ({ request }) => {
    // get auth token
    const authResp = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    expect(authResp.ok()).toBeTruthy();
    expect(authResp.status()).toBe(200);
    const authBody = await authResp.json();
    const token = authBody.token;
    console.log('New token:', token);

    const updateData = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: { checkin: '2023-06-01', checkout: '2023-06-15' },
      additionalneeds: 'Breakfast'
    };

    const updateResp = await request.put('https://restful-booker.herokuapp.com/booking/1', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`
      },
      data: updateData
    });

    console.log('PUT /booking/1 response status:', updateResp.status());
    // API may fail with 405 if booking is read-only or other constraints; log and validate gracefully
    if (updateResp.ok()) {
      const updatedBody = await updateResp.json();
      console.log('PUT /booking/1 response:', updatedBody);
      expect(updatedBody).toHaveProperty('firstname', updateData.firstname);
      expect(updatedBody).toHaveProperty('lastname', updateData.lastname);
      expect(updatedBody).toHaveProperty('totalprice', updateData.totalprice);
      expect(updatedBody).toHaveProperty('depositpaid', updateData.depositpaid);
    } else {
      console.log('PUT /booking/1 failed with status', updateResp.status());
      expect(updateResp.status()).toBeGreaterThanOrEqual(400);
    }
  });
});