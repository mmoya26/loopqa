import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import testCases from '../testcases.json';

const USERNAME = 'admin';
const PASSWORD = 'password123';

// TODO: Change test title
// TODO: Add type for test cases JSON file
// TODO: 
// TODO: 
// TODO: 
// TODO: 
// TODO: 
// TODO: 
// TODO: 
// TODO: 
// TODO: 

for (const testCase of testCases) {
  for (const card of testCase.cards) {
    test(`Verify card with title: ${card.title} exists in card bucket named: ${testCase.cardsBucketTitle}`, async ({ page }) => {
      await login(page, USERNAME, PASSWORD);
      
      const CARD_XPATH = `//div[h2[contains(text(), '${testCase.cardsBucketTitle}')]]//div[h3[contains(text(), '${card.title}')]]`;
      const isElementVisible = await page.locator(CARD_XPATH).isVisible();
      
      await expect(isElementVisible).toBeTruthy();
    });
    
    test(`Verify card with title: ${card.title} has the following tags: ${card.tags}`, async ({ page }) => {
      await login(page, USERNAME, PASSWORD);

      for (const tag of card.tags) {
        const SPAN_XPATH = `//div[h2[contains(text(), '${testCase.cardsBucketTitle}')]]//div[h3[contains(text(), '${card.title}')]]/h3/following-sibling::div[1]//span[text()='${tag}']`;
        const isTagInCardVisible = await page.locator(SPAN_XPATH).isVisible();
        await expect(isTagInCardVisible).toBeTruthy();
      }
    })
  }
}