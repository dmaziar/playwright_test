import { Locator, Page } from '@playwright/test';
type Credentials = {
    userName: string;
    pw: string;
};

export class DevPage {
    readonly page: Page;
    readonly userNameInp: Locator;
    readonly passInp: Locator;
    readonly loginBtn: Locator;
    readonly toDoMvcInp: Locator;
    readonly toDoMvcListItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInp = page.locator('[data-test="username"]');
        this.passInp = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.toDoMvcInp = page.getByPlaceholder('What needs to be done?');
        this.toDoMvcListItem = page.getByRole('listitem');
    }

    async loginToSauceDemo(credentials: Credentials) {
        await this.page.goto('https://www.saucedemo.com/');
        await this.userNameInp.click();
        await this.userNameInp.fill(credentials.userName);
        await this.passInp.click();
        await this.passInp.fill(credentials.pw);
        await this.loginBtn.click();
    }

    async addNewToDoMvc(item: string) {
        await this.toDoMvcInp.fill(item);
        await this.toDoMvcInp.press('Enter');
    }

    async checkToDoMvcItem(item: string) {
        await this.toDoMvcListItem
            .filter({ hasText: item })
            .getByRole('checkbox', { name: 'Toggle Todo' })
            .check();
    }
}
