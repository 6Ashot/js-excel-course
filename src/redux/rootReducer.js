import {
    TABLE_RESIZE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    APPLY_STYLE,
    CHANGE_TITLE
} from './types';
export function rootReducer(state, action) {
    let field;
    let val;
    switch (action.type) {
    case TABLE_RESIZE:
        field = action.data.type === 'col' ?
            'colState' :
            'rowState';
        return {...state, [field]: value(action, field, state)};
    case CHANGE_TEXT:
        field = 'dataState';
        return {
            ...state,
            currentText: action.data.value,
            [field]: value(action, field, state)
        };
    case CHANGE_STYLES:
        return {...state, currentStyle: action.data};
    case APPLY_STYLE:
        field = 'stylesState';
        val = state[field] || {};
        action.data.ids.forEach(id => {
            val[id] = {...val[id], ...action.data.value};
        });
        return {
            ...state,
            [field]: val,
            currentStyle: {...state.currentStyle, ...action.data.value}
        };
    case CHANGE_TITLE:
        return {...state, title: action.data};
    default: return state;
    }
}

function value(action, field, state) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}
