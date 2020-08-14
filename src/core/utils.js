export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function range(start, end) {
    if (end < start) {
        [start, end] = [end, start];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => index + start);
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if(typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}


export function stylesToInline(styles = {}) {
    return Object.keys(styles)
        .map(style => `${camelToDashCase(style)}: ${styles[style]}; `)
        .join('');
}


export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            // eslint-disable-next-line
            fn.apply(this, args);
            clearTimeout(timeout);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
