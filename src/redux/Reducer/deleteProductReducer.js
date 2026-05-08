import * as types from '../actions/actionsTypes'
const initialState={
    data:[],
    loading:false,
    error:null
}

export const deleteReducer = (state=initialState,action)=>{
    switch(action.type){
        case types.DELETE_PRODUCT_DATA_START:
            return{
                ...state,
                error: null,
                loading:true
            }
        case types.DELETE_PRODUCT_DATA_SUCCESS:
            return{
                ...state,
                data:action.payload,
                loading:false
            }
            case types.DELETE_PRODUCT_DATA_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            default:
                return state;    
    }

}