const { test, expect } = require('@playwright/test');


test('@get verify get request', async ({ request }) => {
    const response= await request.get('/booking/1');
    console.log(response.json());
  });