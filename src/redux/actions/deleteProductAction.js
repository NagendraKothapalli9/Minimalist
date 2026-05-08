import { deleteProductApi } from '../api/deleteProductApi'
import * as types from './actionsTypes'

export const deleteProductDataStart=()=>{
    return{
        type:types.DELETE_PRODUCT_DATA_START,
}
}
export const deleteProductDataSuccess=(data)=>{
    console.log("this is delete product reducer call---->")
    return{
        type:types.DELETE_PRODUCT_DATA_SUCCESS,
        payload:data
    }
}
export const deleteProductDataError=(error)=>{
    return{
        type:types.DELETE_PRODUCT_DATA_ERROR,
        payload:error
    }
}
export const deleteProductDataActionInitiate = (id) => {
  return async function (dispatch) {
    dispatch(deleteProductDataStart());
   
    try {
      const res = await deleteProductApi(id);
      dispatch(deleteProductDataSuccess(res.data || {}));
      return res;
    } catch (error) {
      console.error("deleteHomeScreenDataError error", error);
      dispatch(deleteProductDataError(error.message));
      throw error;
    }
  };
};