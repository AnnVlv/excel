import {$, Emitter, StoreSubscriber} from '@core'


export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.storeSubscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', ['excel'])
        const options = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', [Component.className])
            const component = new Component($el, options)
            $el.html(component.toHTML())
            $root.append($el)

            return component
        })

        return $root
    }

    init() {
        this.storeSubscriber.subscribeComponents(this.components)
        this.components.forEach(c => c.init())
    }

    destroy() {
        this.storeSubscriber.unsubscribe()
        this.components.forEach(c => c.destroy())
    }
}
