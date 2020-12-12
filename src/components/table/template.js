const CODES = {
    A: 65,
    Z: 90
}

function createCell(content = '') {
    return `
        <div class="cell" contenteditable>
            ${content}
        </div>
    `
}

function createCol(content = '') {
    return `
        <div class="column">
            ${content}
        </div>
    `
}

function createRow(content = '', info = '') {
    return `
        <div class="row">
            <div class="row-info">
                ${info}
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

    for (let i = 0; i < rowsCount; i++) {
        const cells = Array(colsCount)
            .fill(createCell())
            .join('')
        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}
