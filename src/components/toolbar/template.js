import {isActiveButton} from '@/components/toolbar/helpers'


const toHtml = ({icon, active}) => {
    const type = 'data-type="button"'
    return `
        <div class="button ${active ? 'active' : ''}" ${type}>
            <i class="material-icons" ${type}>
                ${icon}
            </i>
        </div>
    `
}

export const createToolbar = (state, buttons) => {
    buttons = buttons.map(button => ({
        icon: button.icon,
        active: isActiveButton(state, button)
    }))
    return buttons
        .map(toHtml)
        .join('')
}
