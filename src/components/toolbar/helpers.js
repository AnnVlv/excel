export const isActiveButton = (state, button) => {
    return state[button.ruleName] === button.activeValue
}
