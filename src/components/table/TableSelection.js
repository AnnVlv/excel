export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
    }

    selectGroup($cells = []) {
        this.clear()
        this.group = $cells
        $cells.forEach($el => $el.addClass(TableSelection.className))
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    applyStyle(rule) {
        this.group.forEach($cell => $cell.css(rule))
    }
}
