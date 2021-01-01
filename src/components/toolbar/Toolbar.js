import {ExcelStateComponent, $} from '@core'
import {createToolbar} from '@/components/toolbar/template'
import {isActiveButton} from '@/components/toolbar/helpers'
import {BUTTONS, DEFAULT_LOCAL_STATE} from '@/components/toolbar/data'


export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Toolbar',
            listeners: ['click']
        })
    }

    init() {
        super.init()

        this.on('table:select', $cell => {
            let styles = {}
            if (this.state.cellState[$cell.dataset('id')]) {
                styles = this.state.cellState[$cell.dataset('id')].styles || {}
            }
            Object.keys(this.localState).forEach(ruleName => {
                if (!styles[ruleName]) {
                    styles[ruleName] = BUTTONS.find(b => b.ruleName === ruleName)
                        .defaultValue
                }
            })
            this.setLocalState(styles)
        })
    }

    prepare() {
        const localState = this.state.cellState['0:0'] ? {
            ...DEFAULT_LOCAL_STATE,
            ...this.state.cellState['0:0'].styles
        } : DEFAULT_LOCAL_STATE
        this.initLocalState(localState)
    }

    toHTML() {
        return createToolbar(this.localState, BUTTONS)
    }

    onClick(event) {
        const icon = $(event.target).text()
        const button = BUTTONS.find(b => b.icon === icon)
        const value = isActiveButton(this.localState, button) ?
            button.defaultValue :
            button.activeValue
        this.emit('toolbar:applyStyle', {
            ruleName: button.ruleName,
            value
        })
        this.setLocalState({
            [button.ruleName]: value
        })
    }
}
