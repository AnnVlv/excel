export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(eventName, ...data) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false
        }
        this.listeners[eventName].forEach(l => l(...data))
        return true
    }

    subscribe(eventName, listener) {
        this.listeners[eventName] = this.listeners[eventName] || []
        this.listeners[eventName].push(listener)
        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(l => l !== listener)
        }
    }
}
