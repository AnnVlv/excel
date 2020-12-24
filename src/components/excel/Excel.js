import {$} from '@core/DOM'
import {Emitter} from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', ['excel'])
        const options = {
            emitter: this.emitter
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

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(c => c.init())
    }

    destroy() {
        this.components.forEach(c => c.destroy())
    }
}
