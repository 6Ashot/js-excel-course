import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shuldResize} from './table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable();
    }

    onMousedown(event) {
        if (shuldResize(event)) {
            resizeHandler(this.$root, event);
        }
    }
}
