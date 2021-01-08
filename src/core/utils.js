export const STORAGE_KEY_PATTERN = 'excel:'

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

export const camelCaseToDash = str => {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export const debounce = (callback, milliseconds) => {
    let timeout
    return async (...args) => {
        const later = () => {
            clearTimeout(timeout)
            callback(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, milliseconds)
    }
}

export const getStorageKey = id => {
    return `${STORAGE_KEY_PATTERN}${id}`
}

export const getIdFromStorageKey = key => {
    return key.slice(STORAGE_KEY_PATTERN.length)
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
