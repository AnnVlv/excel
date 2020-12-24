export const capitalize = str => {
    return typeof str === 'string' ?
        `${str[0].toUpperCase()}${str.substr(1)}` :
        ''
}

export const range = (start, end) => {
    if (start > end) {
        [start, end] = [end, start]
    }

    return new Array(end - start + 1)
        .fill(null)
        .map((_, i) => start + i)
}

Object.prototype.hasValue = function(value) {
    let hasValue = false
    Object.keys(this).forEach(key => {
        if (this[key] === value) {
            hasValue = true
        }
    })
    return hasValue
}
