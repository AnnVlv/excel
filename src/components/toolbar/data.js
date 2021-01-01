export const DEFAULT_LOCAL_STATE = {
    textAlign: 'left',
    fontWeight: '400',
    fontStyle: 'normal',
    textDecoration: 'none'
}

export const BUTTONS = [
    {
        icon: 'format_align_left',
        activeValue: 'left',
        defaultValue: 'left',
        ruleName: 'textAlign'
    },
    {
        icon: 'format_align_center',
        activeValue: 'center',
        defaultValue: 'left',
        ruleName: 'textAlign'
    },
    {
        icon: 'format_align_right',
        activeValue: 'right',
        defaultValue: 'left',
        ruleName: 'textAlign'
    },
    {
        icon: 'format_bold',
        activeValue: '900',
        defaultValue: '400',
        ruleName: 'fontWeight'
    },
    {
        icon: 'format_italic',
        activeValue: 'italic',
        defaultValue: 'normal',
        ruleName: 'fontStyle'
    },
    {
        icon: 'format_underlined',
        activeValue: 'underline',
        defaultValue: 'none',
        ruleName: 'textDecoration'
    }
]
