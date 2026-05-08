import { getProductData } from '../api/getProductApi';
import * as types from './actionsTypes';


export const getProductDataStart = () => {
    return{
        type: types.LOAD_PRODUCT_DATA_START,
    }  
};

export const getProductDataSuccess = (data) => {
    console.log("this is get action call----->")
    return{
        type: types.LOAD_PRODUCT_DATA_SUCCESS,
        payload: data,
    }  
};

export const getProductDataError = (error) => {
    return{
        type: types.LOAD_PRODUCT_DATA_ERROR,
        payload: error,
    } 
}
export const getProductDataActionInitiate = () => {
  return async function (dispatch) {
    dispatch(getProductDataStart());
   
    try {
      const res = await getProductData();
      console.log("getProductData",res);
      
      dispatch(getProductDataSuccess(res));
    } catch (error) {
      console.error("getProductDataError error", error);
      dispatch(getProductDataError(error.message));
    }
  };
};