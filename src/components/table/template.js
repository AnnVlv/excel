const CODES = {
    A: 65,
    Z: 90
}

function createCell(row = 0) {
    return (_ = '', col = 0) => `
        <div class="cell" contenteditable 
            data-col="${col}" 
            data-id="${row}:${col}"
            data-type="cell">
        </div>
    `
}

function createCol(content = '', index = 0) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content = '', info = '') {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${info}
                ${resize}
            </div>
            <div class="row-data">
                ${content}
            </div>
        </div>
    `
}

const getCharFromCode = code => String.fromCharCode(code)

export const createTable = (rowsCount = 15) => {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = Array(colsCount)
        .fill(null)
        .map((_, i) => getCharFromCode(CODES.A + i))
        .map(createCol)
        .join('')
    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('')
        rows.push(createRow(cells, row + 1))
    }

    return rows.join('')
}
