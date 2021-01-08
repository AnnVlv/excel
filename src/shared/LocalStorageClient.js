import {storage} from '@/shared'


export class LocalStorageClient {
    constructor(key) {
        this.key = key
    }

    get() {
        return new Promise(resolve => {
            resolve(storage(this.key))
        })
    }

    save(data) {
        return new Promise(resolve => {
            storage(this.key, data)
            resolve()
        })
    }
}
