import {OPEN_DATE_CHANGE, STYLES_CHANGE, TABLE_RESIZE, TABLE_TITLE_CHANGE, TEXT_CHANGE} from '@/redux/types'


export const resize = (type, id, value) => ({
    type: TABLE_RESIZE,
    payload: {type, id, value}
})

export const changeText = (text, id) => ({
    type: TEXT_CHANGE,
    payload: {text, id}
})

export const changeStyles = (rule, ids) => ({
    type: STYLES_CHANGE,
    payload: {rule, ids}
})

export const changeTableTitle = title => ({
    type: TABLE_TITLE_CHANGE,
    payload: {title}
})

export const changeOpenDate = () => ({
    type: OPEN_DATE_CHANGE
})
