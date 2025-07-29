import { test as base } from '@playwright/test';
import { AlertsCheck } from '../pageObjects/Alerts';
import { LoginPage } from '../pageObjects/AuthenticationForm';
import { SecureAreaPage } from '../pageObjects/Logout';
import { DownloadPage } from '../pageObjects/Downloader';
import { Uploader } from '../pageObjects/Uploader';

// Types of the fixtures
interface MyFixtures {
  alertsCheck: AlertsCheck;
  loginPage: LoginPage;
  secureAreaPage: SecureAreaPage;
  downloadPage: DownloadPage;
  uploader: Uploader;
}

// Extend base test
export const test = base.extend<MyFixtures>({
  alertsCheck: async ({ page }, use) => {
    const alertsCheck = new AlertsCheck(page);

    await use(alertsCheck);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },
  secureAreaPage: async ({ page }, use) => {
    const secureAreaPage = new SecureAreaPage(page);

    await use(secureAreaPage);
  },  
  downloadPage: async ({ page }, use) => {
    const downloadPage = new DownloadPage(page);

    await use(downloadPage);
  },
  uploader: async ({page}, use) => {
    const uploader = new Uploader(page);

    await use(uploader);
  },
});
