import {ExcelComponent} from '@core'
import * as actions from '../../redux/actions'


export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Header',
            listeners: ['input']
        })
    }

    prepare() {
        this.title = this.state.tableTitle
    }

    toHTML() {
        return `
            <input type="text" class="input" value="${this.title}"/>
    
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
        
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }

    onInput(event) {
        this.dispatchToState(actions.changeTableTitle(event.target.value))
    }
}
