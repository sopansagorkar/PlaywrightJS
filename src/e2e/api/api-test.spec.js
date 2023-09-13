const { test, expect } = require('@playwright/test');
import postData from '../data/api-data.json';

test('@get verify get request', async ({ request }) => {
    const response= await request.get('/booking/1');
    console.log(response.json());
  });

  test('@post verify get request', async ({ request }) => {
    const response= await request.post('/booking',{data:postData});
    console.log(response.json());
  });