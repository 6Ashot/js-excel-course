import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener!');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            let method = getMethodName(listener);
            if (!this[method]) {
                let name = this.name || '';
                throw new Error(`
                    Method ${method} is not implemented in ${name} Component
                `);
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        });
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            let method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}


function getMethodName(event) {
    return 'on' + capitalize(event);
}
