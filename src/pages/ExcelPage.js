import {debounce, getStorageKey, storage, createStore, Page} from '@core'
import {ActiveRoute} from '@core/routing'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {rootReducer} from '@/redux/rootReducer'
import {defaultState} from '@/redux/defaultState'


export class ExcelPage extends Page {
    constructor(tableId) {
        super()

        if (!tableId) {
            ActiveRoute.changeHash('')
            return
        }

        const storageKey = getStorageKey(tableId)
        const tableData = storage(storageKey)
        if (!tableData) {
            storage(storageKey, defaultState)
        }

        const store = createStore(rootReducer, tableData || defaultState)

        const storeSubscriber = debounce(state => {
            storage(storageKey, state)
        }, 500)

        store.subscribe(storeSubscriber)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })
    }

    getRoot() {
        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}
