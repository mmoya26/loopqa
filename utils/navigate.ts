import { Page } from '@playwright/test';

export type Areas = 'Web Application' | 'Mobile Application' | 'Marketing Campaign';

export async function navigateTo(page: Page, area: Areas): Promise<void> {
    const BUTTON_XPATH = `//nav//button[h2[text()='${area}']]`;

    await console.log(`Navigating to ${area}...`);

    await page.locator(BUTTON_XPATH).click();
}