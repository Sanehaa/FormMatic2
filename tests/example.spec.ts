import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('FormMaticFrom Data to').click();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('zain_jaffri@live.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user4321');
  await page.getByRole('main').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Log In' }).dblclick();
  await page.getByRole('textbox', { name: 'Email' }).dblclick();
  await page.getByRole('textbox', { name: 'Email' }).fill('zain_jaffri@live.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user4321');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText('error').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('zain_jaffri@live.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user4321');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.goto('http://localhost:3000/home');
  await page.getByRole('checkbox', { name: 'Simple Transfer' }).check();
  await page.getByRole('textbox', { name: 'Vehicle/ Hull Identification' }).click();
  await page.getByRole('textbox', { name: 'Vehicle/ Hull Identification' }).fill('1234567');
  await page.getByRole('textbox', { name: 'Vehicle License Plate or' }).click();
  await page.getByRole('textbox', { name: 'Vehicle License Plate or' }).fill('0968584883');
  await page.getByRole('textbox', { name: 'Make of Vehicle OR Vessel' }).click();
  await page.getByRole('textbox', { name: 'Make of Vehicle OR Vessel' }).fill('2002');
  await page.getByRole('textbox', { name: 'Year of Vehicle' }).click();
  await page.getByRole('textbox', { name: 'Year of Vehicle' }).fill('2024');
  await page.getByRole('textbox', { name: 'Vehicle Mileage' }).click();
  await page.getByRole('textbox', { name: 'Vehicle Mileage' }).fill('123456');
  await page.getByText('NOT Actual Mileage').click();
  await page.getByRole('textbox', { name: 'First Name' }).first().click();
  await page.getByRole('textbox', { name: 'First Name' }).first().fill('Saneha');
  await page.getByRole('textbox', { name: 'Middle Name' }).first().click();
  await page.getByRole('textbox', { name: 'Middle Name' }).first().fill('Sani');
  await page.getByRole('textbox', { name: 'Last Name' }).first().click();
  await page.getByRole('textbox', { name: 'Last Name' }).first().fill('Gill');
  await page.getByRole('button', { name: 'Save' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Continue Anyway' }).click();
  const page1 = await page1Promise;
});
