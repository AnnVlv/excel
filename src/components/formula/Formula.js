import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['click', 'input']
        })
    }

    toHTML() {
        return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onClick(event) {
        console.log('Formula Click', event.target)
    }

    onInput(event) {
        console.log('Formula Input', event.target)
    }
}
