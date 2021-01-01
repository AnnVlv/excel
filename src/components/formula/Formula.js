import {ExcelComponent, $} from '@core'


export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Formula',
            listeners: ['input', 'keydown'],
            stateFieldsToSubscribe: ['cellText']
        })
    }

    init() {
        super.init()

        this.$input = this.$root.find('#formula-input')
        this.$input.text(this.state.cellState['0:0'] ? this.state.cellState['0:0'].text : '')

        // this.on('table:select', $cell => this.$input.text($cell.text()))
        this.on('table:select', $cell => this.$input.text($cell.dataset('value')))
    }

    toHTML() {
        return `
          <div class="info">fx</div>
          <div class="input" id="formula-input" contenteditable spellcheck="false"></div>
        `
    }

    onStateChange(changes) {
        this.$input.text(changes.cellText)
    }

    onInput(event) {
        this.emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.emit('formula:enter')
        }
    }
}
