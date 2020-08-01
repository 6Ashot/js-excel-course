import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shuldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';

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
        return createTable();
    }
    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', text => {
            this.selection.group.forEach(el => el.$el.innerText = text);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    onMousedown(event) {
        if (shuldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.ctrlKey) {
                const $cells = matrix(this.selection.current, $target).map(id => {
                    return this.$root.find(`[data-id="${id}"]`);
                });
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
            }
        }
    }

    selectCell($cell, event) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
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

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}
