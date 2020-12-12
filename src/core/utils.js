export const capitalize = str => {
    return typeof str === 'string' ?
        `${str[0].toUpperCase()}${str.substr(1)}` :
        ''
}
