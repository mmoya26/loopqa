import { Page } from '@playwright/test';

const APP_URL = 'https://animated-gingersnap-8cf7f2.netlify.app/';

export async function login(page: Page, username: string, password: string): Promise<void> {
    const LOGIN_INPUT_FIELD_XPATH = '//input[@id="username"]';
    const PASSWORD_INPUT_FIELD_XPATH = '//input[@id="password"]';
    const SIGN_IN_BUTTON_XPATH = '//button[@type="submit"]';

    await page.goto(APP_URL);
    await page.locator(LOGIN_INPUT_FIELD_XPATH).fill(username);
    await page.locator(PASSWORD_INPUT_FIELD_XPATH).fill(password);
    await page.locator(SIGN_IN_BUTTON_XPATH).click();
}