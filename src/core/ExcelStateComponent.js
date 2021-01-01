import {ExcelComponent} from '@core'


export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args)
    }

    initLocalState(state) {
        this.localState = {...state}
    }

    setLocalState(state) {
        this.localState = {...this.localState, ...state}
        this.render()
    }

    render() {
        this.$root.html(this.toHTML())
    }
}
