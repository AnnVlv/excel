class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof DOM) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    on(eventName, callback) {
        this.$el.addEventListener(eventName, callback)
    }

    off(eventName, callback) {
        this.$el.removeEventListener(eventName, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    dataset(fieldName, value = '') {
        if (value) {
            this.$el.dataset[fieldName] = value
            return this
        } else {
            return this.$el.dataset[fieldName]
        }
    }

    id(parse) {
        if (parse) {
            const id = this.dataset('id').split(':')
            const [row, col] = id
            return {row: +row, col: +col}
        }
        return this.dataset('id')
    }

    focus() {
        this.$el.focus()
        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    addClass(className) {
        this.$el.classList.add(className)
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName = 'div', classNames = []) => {
    const el = document.createElement(tagName)
    classNames.forEach(cl => el.classList.add(cl))
    return $(el)
}
