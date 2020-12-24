import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/DOM'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            ...options,
            name: 'Formula',
            listeners: ['input', 'keydown']
        })
    }

    init() {
        super.init()

        this.$input = this.$root.find('#formula-input')
        const setText = $cell => this.$input.text($cell.text())

        this.on('table:select', $cell => setText($cell))
        this.on('table:input', $cell => setText($cell))
    }

    toHTML() {
        return `
          <div class="info">fx</div>
          <div class="input" id="formula-input" contenteditable spellcheck="false"></div>
        `
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
