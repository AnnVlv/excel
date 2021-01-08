import {getStorageKey, createStore, Page, ActiveRoute, StateProcessor} from '@core'
import {LocalStorageClient} from '@/shared'
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
        this.tableId = tableId
    }

    async getRoot() {
        const stateProcessor = new StateProcessor(
            new LocalStorageClient(getStorageKey(this.tableId))
        )

        const state = await stateProcessor.get()
        if (!state) {
            await stateProcessor.listen(defaultState)
        }

        const store = createStore(rootReducer, state || defaultState)
        this.subscriber = store.subscribe(stateProcessor.listen)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.subscriber.unsubscribe()
        this.excel.destroy()
    }
}
