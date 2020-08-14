import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shuldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(15, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', text => {
            this.selection.current.attr('data-value', text[0]);
            this.selection.current.text(parse(text[0]));
            this.updateTextInStore(text[0]);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value[0]);
            this.$dispatch(actions.applyStyle({
                value: value[0],
                ids: this.selection.selectedIds
            }));
        });
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch(e) {
            console.log('resize table: ', e);
        }
    }

    onMousedown(event) {
        if (shuldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.ctrlKey) {
                const $cells = matrix(this.selection.current, $target).map(id => {
                    return this.$root.find(`[data-id="${id}"]`);
                });
                this.selection.selectGroup($cells);
            } else {
                this.selectCell($target);
            }
        }
    }

    selectCell($cell, event) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        this.$dispatch(actions.changeStyles($cell.getStyles(Object.keys(defaultStyles))));
    }

    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowRight',
            'ArrowLeft',
            'Tab',
            'Enter'
        ];
        const {key} = event;
        if (keys.includes(key) && !event.ctrlKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }
}
