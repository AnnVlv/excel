import {debounce} from '@core'


export class StateProcessor {
    constructor(handler, debounceTime = 2000) {
        this.listen = debounce(this.listen.bind(this), debounceTime)
        this.handler = handler
    }

    async listen(state) {
        await this.handler.save(state)
    }

    async get() {
        return await this.handler.get()
    }
}
