import {storage} from '@core/utils'


export const STORAGE_KEY = 'excel-state'

const defaultState = {
    colState: {},
    rowState: {},
    cellState: {},
    cellText: '',
    tableTitle: 'Новая таблица'
}

export const initialState = storage(STORAGE_KEY) || defaultState
