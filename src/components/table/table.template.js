import {defaultStyles} from '@/constants';
import {stylesToInline} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
    return (content, index) => {
        return {
            width: getWidth(state, index),
            content,
            index
        };
    };
}

function toCell(state, row) {
    return (_, col) => {
        const width = getWidth(state.colState, col);
        const id = `${row}:${col}`;
        const data = state.dataState[id];
        // console.log(stylesToInline(state.stylesState[id]));
        const styles = stylesToInline({
            ...defaultStyles,
            ...state.stylesState[id]
        });
        return `
            <div class="cell" contenteditable spellcheck="false"
                data-value="${data || ''}"
                data-type="cell"
                data-col="${col}"
                data-id="${id}"
                style="${styles} width: ${width}"
            >
            ${parse(data) || ''}
            </div>
        `;
    };
}

function toColumn({content, index, width}) {
    return `
        <div class="column" 
            data-type="resizable" 
            data-col="${index}"
            style="width:${width}"
            
        >
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(content, number = null, state = null) {
    const resizer = number ?
        '<div class="row-resize" data-resize="row"></div>'
        : '';
    return `
        <div 
        class="row"
        data-type="resizable"
        data-row="${number ? number : ''}"
        style="height: ${getHeight(state.rowState, number)}"
        >
            <div class="row-info">
                ${number ? number : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state) {
    const colsCount = 1 + CODES.Z - CODES.A;
    const rows = [];
    const cols = Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(toColumn)
        .join('');
    rows.push(createRow(cols, null, state));
    for (let i = 0; i < rowsCount; i++) {
        let cells = Array(colsCount)
            .fill('')
            .map(toCell(state, i))
            .join('');

        rows.push(createRow(cells, i+1, state));
    }
    return rows.join('');
}
