import {camelCaseToDash, parse} from '@core'
import {getCharFromCode, toPixels} from '@/components/table/helpers'
import {ELEMENT_TYPES} from '@/components/table/types'


const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 28

const CODES = {
    A: 65,
    Z: 90
}

const getWidth = (state, index) => {
    return toPixels(state.colState[+index] || DEFAULT_WIDTH)
}

const getHeight = (state, index) => {
    return toPixels(state.rowState[+index] || DEFAULT_HEIGHT)
}

const getCellData = (state, row, col) => {
    const defaultData = {styles: {}, text: ''}
    return {
        ...defaultData,
        ...state.cellState[`${row}:${col}`]
    } || defaultData
}

const createRow = (cols, info, height) => {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row"
            ${resize ? `data-type="${ELEMENT_TYPES.RESIZABLE}"` : ''}
            ${info ? `data-row="${info - 1}"` : ''}
            ${height ? `style="height: ${height}"`: ''}
        >
            <div class="row-info">
                ${info ? info : ''}
                ${resize}
            </div>
            <div class="row-data">
                ${cols}
            </div>
        </div>
    `
}

const createCol = (content, index, width) => {
    return `
        <div class="column"
            data-type="${ELEMENT_TYPES.RESIZABLE}"
            data-col="${index}"
            style="width: ${width}"
        >
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

const createCell = (row, col, width, {styles, text}) => {
    styles = Object.keys(styles)
        .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
        .join('; ')
    return `
        <div class="cell"
            contenteditable
            data-col="${col}"
            data-id="${row}:${col}"
            data-type="${ELEMENT_TYPES.CELL}"
            data-value="${text}"
            style="${styles}; width: ${width}"
        >
            ${parse(text)}
        </div>
    `
}

export const createTable = (rowsCount = 15, state = {}) => {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = Array(colsCount)
        .fill(null)
        .map((_, i) => getCharFromCode(CODES.A + i))
        .map((el, col) => createCol(el, col, getWidth(state, col)))
        .join('')
    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = Array(colsCount)
            .fill('')
            .map((el, col) => createCell(
                row, col, getWidth(state, col), getCellData(state, row, col)
            ))
            .join('')
        rows.push(createRow(cells, row + 1, getHeight(state, row)))
    }

    return rows.join('')
}
