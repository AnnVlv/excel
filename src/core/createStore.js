export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: 'INIT'})
    let listeners = []

    return {
        subscribe(callback) {
            listeners.push(callback)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== callback)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(l => l(state))
        },
        getState() {
            return state
        }
    }
}
