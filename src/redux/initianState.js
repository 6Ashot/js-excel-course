import {storage, clone} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyle: defaultStyles,
    title: defaultTitle,
    openedDate: new Date().toJSON()
};

const normalize = state => {
    return {
        ...state,
        currentText: '',
        currentStyle: defaultStyles
    };
};

export function normalizeInitialState(state) {
    return state
        ? normalize(state)
        : clone(defaultState);
}
