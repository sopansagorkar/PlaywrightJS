const { test, expect } = require('@playwright/test');
import postData from '../data/api-data.json';
var token;
test('@get verify get request', async ({ request }) => {
    const response= await request.get('/booking/1');
    console.log(response.json());
  });

  test('@post verify get request', async ({ request }) => {
    const response= await request.post('/booking',{data:postData});
    console.log(response.json());
    expect(response.ok()).toBeTruthy();

    expect(response.status()).toBe(200);
  
    const responseBody = await response.json()
  
    expect(responseBody.booking).toHaveProperty("firstname", "Jim");
  
    expect(responseBody.booking).toHaveProperty("lastname", "Brown");
  
    expect(responseBody.booking).toHaveProperty("totalprice", 111);
  
    expect(responseBody.booking).toHaveProperty("depositpaid", true);

  });


  test('@Put verify put request', async ({ request }) => {

    const response = await request.post('/auth', {
  
      data: {
  
        "username": "admin",
  
        "password": "password123"
  
      }
  
    });
  
    console.log(response.json());
  
    expect(response.ok()).toBeTruthy();
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
  
    token = responseBody.token;
  
    console.log("New Token is: " + token);
  
   
  
   
  
    // PUT
  
    const updateRequest = await request.put('/booking/1', {
  
      headers: {
  
        'Content-Type': 'application/json',
  
        'Accept': 'application/json',
  
        'Cookie': "token='$token'"
  
      },
  
      data: {
  
        "firstname": "Jim",
  
        "lastname": "Brown",
  
        "totalprice": 111,
  
        "depositpaid": true,
  
        "bookingdates": {
  
          "checkin": "2023-06-01",
  
          "checkout": "2023-06-15"
  
        },
  
        "additionalneeds": "Breakfast"
  
      }
  
    });
  
    console.log(updateRequest.json());
  
    expect(updateRequest.ok()).toBeTruthy();
  
    expect(updateRequest.status()).toBe(200);
  
    const updatedResponseBody = await updateRequest.json()
  
    expect(updatedResponseBody).toHaveProperty("firstname", "Jim");
  
    expect(updatedResponseBody).toHaveProperty("lastname", "Brown");
  
    expect(updatedResponseBody).toHaveProperty("totalprice", 111);
  
    expect(updatedResponseBody).toHaveProperty("depositpaid", true);
  
  });