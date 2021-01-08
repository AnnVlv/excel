export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.prevState = this.store.getState()
    }

    subscribeComponents(components) {
        this.subscriprion = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (state[key] === this.prevState[key]) {
                    return
                }
                components.forEach(c => {
                    if (c.stateFieldsToSubscribe.includes(key)) {
                        c.onStateChange({[key]: state[key]})
                    }
                })
            })
            this.prevState = state
        })
    }

    unsubscribe() {
        this.subscriprion.unsubscribe()
    }
}
