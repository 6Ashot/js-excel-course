const CODES = {
    A: 65,
    Z: 90
};

function toCell(_, col) {
    return `
        <div class="cell" contenteditable spellcheck="false"
            data-col="${col}"
        >
        </div>
    `;
}

function toColumn(content, index) {
    return `
        <div class="column" 
            data-type="resizable" 
            data-col="${index}"
            
        >
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(content, number = null) {
    const resizer = number ?
        '<div class="row-resize" data-resize="row"></div>'
        : '';
    return `
        <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
    const colsCount = 1 + CODES.Z - CODES.A;
    const rows = [];
    const cols = Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');
    rows.push(createRow(cols));
    for (let i = 0; i < rowsCount; i++) {
        let cells = Array(colsCount)
            .fill('')
            .map(toCell)
            .join('');
        rows.push(createRow(cells, i+1));
    }
    return rows.join('');
}
