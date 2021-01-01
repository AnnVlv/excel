import {ExcelComponent, parse, $} from '@core'
import {createTable} from '@/components/table/template'
import {resizeHandler} from '@/components/table/resizeHandler'
import {getMatrix, getNextSelector, shouldResize, shouldSelect} from '@/components/table/helpers'
import {TableSelection} from '@/components/table/TableSelection'
import {KEYS} from '@/components/table/types'
import * as actions from '@/redux/actions'


export class Table extends ExcelComponent {
    static className = 'excel__table'

    get currentSelectedCell() {
        return this.selection.current
    }

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Table',
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
            this.selection.current
                .text(parse(value))
                .dataset('value', value)
            this.dispatchCurrentState(value)
        })

        this.on('formula:enter', () => {
            this.selection.current.focus()
        })

        this.on('toolbar:applyStyle', rule => {
            this.selection.group.forEach($cell => {
                $cell.css({
                    [rule.ruleName]: rule.value
                })
            })
            const ids = this.selection.group.map($cell => $cell.dataset('id'))
            this.dispatchToState(actions.changeStyles(rule, ids))
        })
    }

    toHTML() {
        return createTable(17, this.state)
    }

    dispatchCurrentState(text) {
        this.dispatchToState(actions.changeText(text, this.selection.current.dataset('id')))
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
        this.dispatchCurrentState($(event.target).text())
    }

    async resizeTable(event) {
        try {
            const {type, id, value} = await resizeHandler(this.$root, event)
            this.dispatchToState(actions.resize(type, id, value))
        } catch (e) {
            console.warn(e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
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
