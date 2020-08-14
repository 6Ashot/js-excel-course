import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from './toolbar.tenplate';
import {$} from '@core/dom';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyle'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyles);
    }

    storeChange(changes) {
        this.setState(changes.currentStyle);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHTML() {
        return this.template;
    }

    onClick(event) {
        const $target = $(event.target);
        if($target.data.type && $target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            const key = Object.keys(value)[0];
            this.$emit('toolbar:applyStyle', value);
            // this.setState({[key]: value[key]});
        }
    }
}
