import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/template'
import {resizeHandler} from '@/components/table/resizeHandler'
import {getMatrix, getNextSelector, KEYS, shouldResize, shouldSelect} from '@/components/table/helpers'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/DOM'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    get currentSelectedCell() {
        return this.selection.current
    }

    constructor($root, options) {
        super($root, {
            ...options,
            listeners: ['mousedown', 'keydown', 'input']
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selection.select(this.$root.find('[data-id="0:0"]'))

        this.on('formula:input', value => {
            this.selection.current.text(value)
        })

        this.on('formula:enter', () => {
            this.selection.current.focus()
        })
    }

    toHTML() {
        return createTable(17)
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.emitSelection()
    }

    selectCellGroup($cell) {
        this.selection.selectGroup($cell)
        this.emitSelection()
    }

    emitSelection() {
        this.emit('table:select', this.currentSelectedCell)
    }

    onInput(event) {
        this.emit('table:input', $(event.target))
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (shouldSelect(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = getMatrix(this.currentSelectedCell, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selectCellGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const {key} = event
        if (KEYS.hasValue(key) && !event.shiftKey) {
            event.preventDefault()
            const currentId = this.currentSelectedCell.id(true)
            const $next = this.$root.find(getNextSelector(key, currentId))
            this.selectCell($next)
        }
    }
}
