import {$} from '@core'
import {ActiveRoute} from '@core/routing/ActiveRoute'


export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('No selector provided for Router')
        }

        this.$selector = $(selector)
        this.routes = routes
        this.page = null

        this.onPageChange = this.onPageChange.bind(this)

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.onPageChange)
        this.onPageChange()
    }

    onPageChange() {
        this.$selector.clear()
        this.page ? this.page.destroy() : null

        const path = ActiveRoute.path
        const routeName = Object.keys(this.routes)
            .find(key => this.routes[key].path === path)
        const Page = this.routes[routeName].pageClass

        this.page = new Page(ActiveRoute.param)
        this.$selector.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.onPageChange)
    }
}
