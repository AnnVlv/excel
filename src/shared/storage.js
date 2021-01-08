export const storage = (key, value) => {
    if (!value) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(value))
}
