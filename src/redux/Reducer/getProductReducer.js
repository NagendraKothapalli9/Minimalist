import * as types from '../actions/actionsTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const getReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_PRODUCT_DATA_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.LOAD_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        case types.LOAD_PRODUCT_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};