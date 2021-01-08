import {createStore} from './createStore'


const ADD = 'ADD'
const UNTREATED_TYPE = 'UNTREATED_TYPE'

const initialState = {
    count: 0
}

const afterAddActionState = {
    count: 1
}

const add = () => ({
    type: ADD
})

const doNothing = () => ({
    type: UNTREATED_TYPE
})

const countReducer = (state = initialState, action) => {
    if (action.type === ADD) {
        return {
            ...state,
            count: state.count + 1
        }
    }
    return state
}

describe('createStore', () => {
    let store
    let subscriber

    beforeEach(() => {
        store = createStore(countReducer, initialState)
        subscriber = jest.fn()
    })

    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).toBeDefined()
    })

    test('should return state object', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })

    test('should return initial state if action type is ADD', () => {
        expect(store.getState()).toEqual(initialState)
    })

    test('should change state', () => {
        store.dispatch(add())
        expect(store.getState()).toEqual(afterAddActionState)
    })

    test('should not change state if action type is untreated', () => {
        store.dispatch(doNothing())
        expect(store.getState()).toEqual(initialState)
    })

    test('should call subscriber after state change', () => {
        store.subscribe(subscriber)
        store.dispatch(add())
        expect(subscriber).toHaveBeenCalledWith(afterAddActionState)
    })

    test('should not call subscriber after dispatch unfounded action type', () => {
        store.subscribe(subscriber)
        store.dispatch(doNothing())
        expect(subscriber).not.toHaveBeenCalledWith()
    })

    test('should not call subscriber if call unsubscribe', () => {
        const subscription = store.subscribe(subscriber)
        subscription.unsubscribe()
        store.dispatch(doNothing())
        expect(subscriber).not.toHaveBeenCalledWith()
    })
})
