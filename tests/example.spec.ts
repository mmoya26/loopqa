import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import { navigateTo } from '../utils/navigate';
import { Areas } from '../utils/navigate';
import testCases from '../testcases.json';

const USERNAME = 'admin';
const PASSWORD = 'password123';

for (const testCase of testCases) {
  for (const bucket of testCase.buckets) {
    for (const card of bucket.cards) {
      test(`Verify card with title: ${card.title} exists in card bucket named: ${bucket.title} in area: ${testCase.areaName}`, async ({ page }) => {
        await login(page, USERNAME, PASSWORD);
        await navigateTo(page, testCase.areaName as Areas);

        const CARD_XPATH = `//div[h2[contains(text(), '${bucket.title}')]]//div[h3[contains(text(), '${card.title}')]]`;
        const cardLocator = await page.locator(CARD_XPATH)
        
        await expect(cardLocator).toBeTruthy();
      });

      test(`Verify card with title: ${card.title} has the following tags: ${card.tags} in area: ${testCase.areaName}`, async ({ page }) => {
        await login(page, USERNAME, PASSWORD);
        await navigateTo(page, testCase.areaName as Areas);
  
        for (const tag of card.tags) {
          const SPAN_XPATH = `//div[h2[contains(text(), '${bucket.title}')]]//div[h3[contains(text(), '${card.title}')]]/h3/following-sibling::div[1]//span[text()='${tag}']`;
          const tagLocator = await page.locator(SPAN_XPATH);

          await expect(tagLocator).toBeTruthy();
        }
      })
    }
  }
}