import {OPEN_DATE_CHANGE, STYLES_CHANGE, TABLE_RESIZE, TABLE_TITLE_CHANGE, TEXT_CHANGE} from '@/redux/types'
import {RESIZE_TYPES} from '@/components/table/types'


export const rootReducer = function(state, action) {
    switch (action.type) {
    case TABLE_RESIZE: {
        const {type, id, value} = action.payload
        const selector = type === RESIZE_TYPES.COL ? 'colState' : 'rowState'
        return {
            ...state,
            [selector]: {
                ...state[selector],
                [id]: value
            }
        }
    }
    case TEXT_CHANGE: {
        const {text, id} = action.payload
        return {
            ...state,
            cellState: {
                ...state.cellState,
                [id]: {
                    ...state.cellState[id],
                    text
                }
            },
            cellText: text
        }
    }
    case STYLES_CHANGE: {
        const {rule: {ruleName, value}, ids} = action.payload
        const newState = {
            ...state,
            cellState: {
                ...state.cellState
            }
        }
        ids.forEach(id => {
            newState.cellState[id] = {
                ...state.cellState[id],
                styles: {
                    ...newState.cellState[id] ? newState.cellState[id].styles : {},
                    [ruleName]: value
                }
            }
        })
        return newState
    }
    case TABLE_TITLE_CHANGE:
        return {
            ...state,
            tableTitle: action.payload.title
        }
    case OPEN_DATE_CHANGE:
        return {
            ...state,
            openDate: new Date().toJSON()
        }
    default:
        return state
    }
}
