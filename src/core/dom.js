class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (html) {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    attr(name, value) {
        if(value) {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }

    clear() {
        this.html('');
        return this;
    }

    on(event, cb) {
        this.$el.addEventListener(event, cb);
    }

    off(event, cb) {
        this.$el.removeEventListener(event, cb);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    get data() {
        return this.$el.dataset;
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    find = (selector) => {
        return $(document.querySelector(selector));
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach((key) => this.$el.style[key] = styles[key]);
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s];
            return res;
        }, {});
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            };
        }
        return this.$el.dataset.id;
    }

    focus() {
        this.$el.focus();
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const $el = document.createElement(tagName);
    if (classes) {
        $el.classList.add(classes);
    }
    return $($el);
};

$.find = (selector) => {
    return $(document.querySelector(selector));
};

