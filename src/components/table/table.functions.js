import {range} from '@core/utils';

export function shuldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
    const current = $current.id(true);
    const target = $target.id(true);
    const rows = range(current.row, target.row);
    const cols = range(current.col, target.col);
    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export function nextSelector(key, {row, col}) {
    switch (key) {
    case 'ArrowDown':
    case 'Enter':
        row++;
        break;
    case 'ArrowRight':
    case 'Tab':
        col++;
        break;
    case 'ArrowUp':
        row = row > 0 ? --row : row;
        break;
    case 'ArrowLeft':
        col = col > 0 ? --col : col;
        break;
    }

    return `[data-id="${row}:${col}"]`;
}
