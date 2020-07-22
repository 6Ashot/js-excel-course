const CODES = {
    A: 65,
    Z: 90
};

function createCell() {
    return `<div class="cell" contenteditable spellcheck="false"></div>`;
}

function createCol(content) {
    return `<div class="column">${content}</div>`;
}

function createRow(content, number = null) {
    return `<div class="row">
            <div class="row-info">${number ? number : ''}</div>
            <div class="row-data">${content}</div>
        </div>`;
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
        .map(createCol)
        .join('');
    rows.push(createRow(cols));
    for (let i = 0; i < rowsCount; i++) {
        let cells = Array(colsCount)
            .fill('')
            .map(createCell)
            .join('');
        rows.push(createRow(cells, i+1));
    }
    return rows.join('');
}


/*
      <div class="row">
            <div class="row-info"></div>
            <div class="row-data">
                <div class="column">A</div>
                <div class="column">B</div>
                <div class="column">C</div>
            </div>
        </div>
        <div class="row">
            <div class="row-info">1</div>
            <div class="row-data">
                <div class="cell" contenteditable spellcheck="false">A1</div>
                <div class="cell" contenteditable spellcheck="false">B1</div>
                <div class="cell" contenteditable spellcheck="false">C1</div>
            </div>
        </div>
        <div class="row">
            <div class="row-info">2</div>
            <div class="row-data">
                <div class="cell" contenteditable spellcheck="false">A2</div>
                <div class="cell" contenteditable spellcheck="false">B2</div>
                <div class="cell" contenteditable spellcheck="false">C2</div>
            </div>
        </div>
*/
