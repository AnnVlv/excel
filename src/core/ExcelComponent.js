import {DOMListener} from '@core/DOMListener'


export class ExcelComponent extends DOMListener {
    get state() {
        return this.store.getState()
    }

    constructor($root, options = {}) {
        super($root, options.listeners)

        this.name = options.name || ''
        this.store = options.store
        this.stateFieldsToSubscribe = options.stateFieldsToSubscribe || []
        this.emitter = options.emitter
        this.unsubs = []

        this.prepare()
    }

    prepare() {

    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubs.forEach(unsub => unsub)
    }

    toHTML() {
        return ''
    }

    emit(eventName, value) {
        this.emitter.emit(eventName, value)
    }

    on(eventName, callback) {
        const unsub = this.emitter.subscribe(eventName, callback)
        this.unsubs.push(unsub)
    }

    dispatchToState(action) {
        this.store.dispatch(action)
    }

    onStateChange(changes) {

    }
}
