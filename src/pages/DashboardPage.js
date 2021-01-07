import {$, storage, Page, getIdFromStorageKey, STORAGE_KEY_PATTERN} from '@core'
import {createDashboard} from '@/pages/dashboard.template'


export class DashboardPage extends Page {
    getRoot() {
        const $root = $.create('div', ['db'])
        $root.html(createDashboard(this.getItems()))
        return $root
    }

    getItems() {
        const items = []
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(STORAGE_KEY_PATTERN)) {
                items.push({
                    state: storage(key),
                    id: getIdFromStorageKey(key)
                })
            }
        })
        return items
    }
}
