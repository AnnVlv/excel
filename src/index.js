import {Router} from '@core'
import {DashboardPage, ExcelPage} from '@/pages'
import './scss/index.scss'


new Router('#app', {
    dashboard: {
        pageClass: DashboardPage,
        path: ''
    },
    excel: {
        pageClass: ExcelPage,
        path: 'excel'
    }
})
