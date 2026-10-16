import { expect, Locator, Page } from '@playwright/test'


export class DroppablePage {
    readonly page: Page
    private readonly dragMe: Locator
    private readonly droppable: Locator
    private readonly adBanner: Locator


    constructor(page: Page) {
        this.page = page
        this.dragMe = page.locator('#draggable')
        this.droppable = page.locator('#droppable').first()
        this.adBanner = page.locator('iframe[name*="google_ads_iframe"]')
    }

    async dragAndDrop(): Promise<void> {
        await this.page.waitForLoadState('networkidle', { timeout: 60000 });
        await this.dragMe.scrollIntoViewIfNeeded();
        await this.dragMe.waitFor({ state: 'visible' });
        await this.droppable.waitFor({ state: 'visible' });
        await this.dragMe.dragTo(this.droppable);

    }

    async verifyDrop(): Promise<void> {
        await expect(this.droppable).toHaveText('Dropped!');
    }
}
