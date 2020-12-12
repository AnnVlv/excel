import {capitalize} from '@core/utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No root provided to DOMListener!')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const callbackName = getEventCallbackName(listener)
            this[callbackName] = this[callbackName].bind(this)
            if (!this[callbackName]) {
                throw new Error(`Method ${callbackName} was not implemented in ${this.name} Component`)
            }
            this.$root.on(listener, this[callbackName])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            this.$root.off(listener, this[getEventCallbackName(listener)])
        })
    }
}

function getEventCallbackName(eventName) {
    return `on${capitalize(eventName)}`
}
