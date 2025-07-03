import { test } from '@playwright/test';
import { Uploader } from './pageObjects/Uploader';

test('verify that file can be uploaded successfully', async ({ page }) => {
  const uploadPage = new Uploader(page);

  await uploadPage.goToPage();

  await uploadPage.uploadFileChooseButton('notes.txt');

  await uploadPage.verifyUpload('notes.txt');
});
