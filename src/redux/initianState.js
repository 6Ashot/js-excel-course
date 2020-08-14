import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyle: defaultStyles,
    title: defaultTitle
};

const normalize = state => {
    return {
        ...state,
        currentText: '',
        currentStyle: defaultStyles
    };
};

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState;
