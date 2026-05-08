import * as types from '../actions/actionsTypes';

const initialState={
    data:[],
    loading:false,
    error:null

}
export const postReducer=(state=initialState,action)=>{

    switch(action.type){
        case types.CREATE_PRODUCT_DATA_START:
        return{
            ...state,
            loading:true,
            error:null
        }
        case types.CREATE_PRODUCT_DATA_SUCCESS:
            console.log("this is post reducer success call---->")
            return{
                data:action.payload,
                loading:false,
                error:null
            }
            case types.CREATE_PRODUCT_DATA_ERROR:
                console.log("this is post reducer error call---->")
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
            default:
                return state;
    }
}