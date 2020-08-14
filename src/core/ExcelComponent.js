import {DomListener} from '@core/DomListener';


export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.store = options.store;
        this.subscribe = options.subscribe || [];
        this.unsubs = [];
        this.prepare();
    }

    prepare() {}

    toHTML() {
        return '';
    }

    storeChange() {}

    init() {
        this.initDomListeners();
    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    $emit(event, ...args) {
        this.emitter.emit(event, args);
    }

    $on(event, cb) {
        this.unsubs.push(this.emitter.subscribe(event, cb));
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    destroy() {
        this.removeDomListeners();
        this.unsubs.forEach(cb => cb());
    }
}
