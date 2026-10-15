import {test as baseTest} from "@playwright/test"
import { PracticeFormPage } from "../pages/PracticeFormPage"
import { DroppablePage } from "../pages/DroppablePage"

type pages = {
    practiceFormPage : PracticeFormPage,
    droppablePage : DroppablePage
}


export const testFixture = baseTest.extend<pages>({
    practiceFormPage : async({page}, use) => {
        await use(new PracticeFormPage(page));
    },
    droppablePage : async({page}, use) => {
        await use(new DroppablePage(page));
    }
})

export const expect = baseTest.expect