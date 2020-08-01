import {DomListener} from '@core/DomListener';


export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubs = [];
        this.prepare();
    }

    prepare() {}

    toHTML() {
        return '';
    }
    init() {
        this.initDomListeners();
    }

    $emit(event, ...args) {
        this.emitter.emit(event, args);
    }

    $on(event, cb) {
        this.unsubs.push(this.emitter.subscribe(event, cb));
    }

    destroy() {
        this.removeDomListeners();
        this.unsubs.forEach(cb => cb());
    }
}
