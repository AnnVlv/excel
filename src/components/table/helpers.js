import {range} from '@core/utils'

export const shouldResize = event => !!event.target.dataset.resize

export const shouldSelect = event => event.target.dataset.type === 'cell'

export const toPixels = pixels => `${pixels}px`

export const getMatrix = (current, target) => {
    const currentId = current.id(true)
    const targetId = target.id(true)

    const rows = range(currentId.row, targetId.row)
    const cols = range(currentId.col, targetId.col)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export const KEYS = {
    ENTER: 'Enter',
    TAB: 'Tab',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp'
}

export const getNextSelector = (key, {col, row}) => {
    switch (key) {
    case KEYS.ENTER:
    case KEYS.ARROW_DOWN:
        row++
        break
    case KEYS.TAB:
    case KEYS.ARROW_RIGHT:
        col++
        break
    case KEYS.ARROW_LEFT:
        if (col) col--
        break
    case KEYS.ARROW_UP:
        if (row) row--
        break
    default:
        break;
    }

    return `[data-id="${row}:${col}"]`
}
