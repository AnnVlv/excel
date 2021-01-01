import {$} from '@core'
import {toPixels} from '@/components/table/helpers'
import {ELEMENT_TYPES, RESIZE_TYPES} from '@/components/table/types'


export const resizeHandler = ($root, event) => {
    return new Promise(resolve => {
        const resizeType = event.target.dataset.resize
        const $resizer = $(event.target)
        const $parent = $resizer.closest(`[data-type="${ELEMENT_TYPES.RESIZABLE}"]`)

        const ruleName = resizeType === RESIZE_TYPES.COL ? 'bottom' : 'right'
        $resizer.css({
            [ruleName]: '-1000px'
        })

        let value

        document.onmousemove = e => {
            const coords = $parent.getCoords()
            if (resizeType === RESIZE_TYPES.COL) {
                const delta = e.pageX - coords.right
                $resizer.css({
                    right: toPixels(-delta)
                })
                value = coords.width + delta
            } else {
                const delta = e.pageY - coords.bottom
                $resizer.css({
                    bottom: toPixels(-delta)
                })
                value = coords.height + delta
            }
        }

        document.onmouseup = () => {
            if (resizeType === RESIZE_TYPES.COL) {
                const index = $parent.dataset('col')
                const pixels = toPixels(value)
                $root.findAll(`[data-col="${index}"]`)
                    .forEach(cell => cell.style.width = pixels)
            } else {
                $parent.css({
                    height: toPixels(value)
                })
            }

            $resizer.css({
                bottom: 0,
                right: 0
            })

            document.onmousemove = null
            document.onmouseup = null

            resolve({
                type: resizeType,
                id: $parent.dataset(resizeType),
                value
            })
        }
    })
}
