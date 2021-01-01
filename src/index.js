import {storage, createStore, debounce} from '@core'
import {Excel} from '@/components/excel/Excel'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Header} from '@/components/header/Header'
import {rootReducer} from '@/redux/rootReducer'
import {initialState, STORAGE_KEY} from '@/redux/initialState'
import './scss/index.scss'


const DEBOUNCE = 500

const store = createStore(rootReducer, initialState)

const storeSubscriber = debounce(state => {
    storage(STORAGE_KEY, state)
}, DEBOUNCE)

store.subscribe(storeSubscriber)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})
excel.render()
