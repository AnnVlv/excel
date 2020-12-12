import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/template'
import {resizeHandler} from '@/components/table/resizeHandler'
import {shouldResize} from '@/components/table/helpers';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(17)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}
