import {$} from '@core/DOM'
import {toPixels} from '@/components/table/helpers'

const RESIZE_TYPES = {
    COL: 'col',
    ROW: 'row'
}

export const resizeHandler = ($root, event) => {
    const resizeType = event.target.dataset.resize
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')

    const ruleName = resizeType === RESIZE_TYPES.COL ? 'bottom' : 'right'
    $resizer.css({
        [ruleName]: '-1000px'
    })

    let pixels

    document.onmousemove = e => {
        const coords = $parent.getCoords()
        if (resizeType === RESIZE_TYPES.COL) {
            const delta = e.pageX - coords.right
            $resizer.css({
                right: toPixels(-delta)
            })
            pixels = toPixels(coords.width + delta)
        } else {
            const delta = e.pageY - coords.bottom
            $resizer.css({
                bottom: toPixels(-delta)
            })
            pixels = toPixels(coords.height + delta)
        }
    }

    document.onmouseup = () => {
        if (resizeType === RESIZE_TYPES.COL) {
            const index = $parent.dataset('col')
            $root.findAll(`[data-col="${index}"]`)
                .forEach(cell => cell.style.width = pixels)
        } else {
            $parent.css({
                height: pixels
            })
        }

        $resizer.css({
            bottom: 0,
            right: 0
        })

        document.onmousemove = null
        document.onmouseup = null
    }
}
