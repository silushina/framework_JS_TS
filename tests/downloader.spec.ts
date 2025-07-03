import { test, expect } from '@playwright/test';
import { DownloadPage } from './pageObjects/Downloader';

test.describe('Download Page Tests', () => {
  let downloadPage: DownloadPage;

  test.beforeEach(async ({ page }) => {
    downloadPage = new DownloadPage(page);
    await downloadPage.goToPage(); 
  });

  // Test downloading the first file from the list
  test('verify that the first file can be downloaded', async () => {
    const filePath = await downloadPage.downloadFileAt(0); // first link
    console.log('Download finished, file saved to:', filePath);

    // Check if file was downloaded
    const wasDownloaded = downloadPage.fileWasDownloaded(filePath);
    console.log('Was file downloaded?', wasDownloaded);
    expect(wasDownloaded).toBeTruthy();
  });

  // Test downloading a file from a random index
  test('verify that a random file can be downloaded', async () => {
    const totalLinks = await downloadPage.downloadLinks.count(); // how many files available
    const randomIndex = Math.floor(Math.random() * totalLinks); // pick a random one
    console.log('Random index chosen:', randomIndex);

    const filePath = await downloadPage.downloadFileAt(randomIndex);
    const downloaded = downloadPage.fileWasDownloaded(filePath);
    expect(downloaded).toBe(true);
  });

  // Test that downloaded file is not empty
  test('verify that downloaded file is not empty', async () => {
    const filePath = await downloadPage.downloadFileAt(1); // second file
    const fs = require('fs');

    const stats = fs.statSync(filePath); // get file info
    console.log('Downloaded file size:', stats.size);
    expect(stats.size).toBeGreaterThan(0); // make sure file size isn't 0
  });
});
