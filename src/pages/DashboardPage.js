import {$, Page, getIdFromStorageKey, STORAGE_KEY_PATTERN} from '@core'
import {LocalStorageClient} from '@/shared'
import {createDashboard} from '@/pages/dashboard.template'


export class DashboardPage extends Page {
    async getRoot() {
        const $root = $.create('div', ['db'])
        $root.html(createDashboard(await this.getItems()))
        return $root
    }

    async getItems() {
        const items = []
        for (const key of Object.keys(localStorage)) {
            if (key.startsWith(STORAGE_KEY_PATTERN)) {
                items.push({
                    state: await new LocalStorageClient(key).get(key),
                    id: getIdFromStorageKey(key)
                })
            }
        }
        return items
    }
}
