export class ActiveRoute {
    static get fullPath() {
        return window.location.hash.slice(1) || ''
    }

    static get path() {
        return ActiveRoute.fullPath.split('/')[0] || ''
    }

    static get param() {
        return ActiveRoute.fullPath.split('/')[1] || ''
    }

    static changeHash(hash) {
        window.location.hash = hash
    }
}
