import {test as baseTest} from "@playwright/test"
import { PracticeFormPage } from "../pages/PracticeFormPage"
import { DroppablePage } from "../pages/DroppablePage"
import { HomePage } from "../pages/HomePage"

type pages = {
    homePage : HomePage,
    practiceFormPage : PracticeFormPage,
    droppablePage : DroppablePage
}


export const testFixture = baseTest.extend<pages>({
    homePage : async({page}, use) => {
        await use(new HomePage(page));
    },
    practiceFormPage : async({page}, use) => {
        await use(new PracticeFormPage(page));
    },
    droppablePage : async({page}, use) => {
        await use(new DroppablePage(page));
    }
})

export const expect = baseTest.expect