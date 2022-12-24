// @ts-check
import { test, expect, request } from '@playwright/test';
import { DevPage } from '../pages/dev-page';

test('Todo mvc test', async ({ page }) => {
    const devPage = new DevPage(page);
    const firstItem: string = 'First todo item';
    const secondItem: string = 'Second todo Item';
    await page.goto('https://demo.playwright.dev/todomvc/');
    await devPage.addNewToDoMvc(firstItem);
    await devPage.addNewToDoMvc(secondItem);
    await devPage.checkToDoMvcItem(firstItem);
    await devPage.checkToDoMvcItem(secondItem);
});

test('Sauce test', async ({ page }) => {
    const devPage = new DevPage(page);
    const userName: string = 'standard_user';
    const pw: string = 'secret_sauce';
    devPage.loginToSauceDemo({ userName, pw });
    await expect(page).toHaveTitle('Swag Labs');
});

test('Testing api calls', async () => {
    const apiToken = process.env.CI ? 'someVariable' : process.env.API_TOKEN;
    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `${apiToken} `,
        },
        baseURL: 'https://api.github.com',
    });
    const getIssues = await apiContext.get('/issues?filter=all');
    const res = await getIssues.json();
    expect(getIssues.ok()).toBeTruthy();
    expect(res).toContainEqual(
        expect.objectContaining({
            state: 'open',
            body: 'Some comments',
        }),
    );
});
