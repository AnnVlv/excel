import {ExcelComponent, $, ActiveRoute, getStorageKey} from '@core'
import * as actions from '../../redux/actions'


const BUTTONS = {
    DELETE_TABLE: 'DELETE_TABLE',
    EXIT: 'EXIT'
}

const CONFIRM_MESSAGE = 'Are you sure you want to delete this table?'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Header',
            listeners: ['input', 'click']
        })
    }

    prepare() {
        this.title = this.state.tableTitle
    }

    toHTML() {
        return `
            <input type="text" class="input" value="${this.title}"/>
    
            <div>
                <div class="button" data-type="${BUTTONS.DELETE_TABLE}">
                    <i class="material-icons" data-type="${BUTTONS.DELETE_TABLE}">delete</i>
                </div>
        
                <div class="button" data-type="${BUTTONS.EXIT}">
                    <i class="material-icons" data-type="${BUTTONS.EXIT}">exit_to_app</i>
                </div>
            </div>
        `
    }

    onInput(event) {
        this.dispatchToState(actions.changeTableTitle(event.target.value))
    }

    onClick(event) {
        const $target = $(event.target)
        const type = $target.dataset('type')

        switch (type) {
        case BUTTONS.DELETE_TABLE:
            const answer = confirm(CONFIRM_MESSAGE)
            if (answer) {
                localStorage.removeItem(getStorageKey(ActiveRoute.param))
                ActiveRoute.changeHash('')
            }
            break
        case BUTTONS.EXIT:
            this.dispatchToState(actions.changeOpenDate())
            ActiveRoute.changeHash('')
            break
        }
    }
}
