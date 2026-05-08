import { saveProductData } from '../api/addProductApi';
import * as types from './actionsTypes'


export const postProductDataStart=()=>{
    return{
        type:types.CREATE_PRODUCT_DATA_START
    }   
};

export const postProductDataSuccess=(data)=>{
    console.log("this is postdatasuccessaction---->",data)
    return{
        type:types.CREATE_PRODUCT_DATA_SUCCESS,
        payload:data
    }
};

export const postProductDataError=(error)=>{
    console.log("this is postdataerrorsaction---->")
    return{
        type:types.CREATE_PRODUCT_DATA_ERROR,
        payload:error
    }
}
export const postProductDataActionInitiate = (formData) => {
  return async function (dispatch) {
    dispatch(postProductDataStart());
   
 
    try {
      const res = await saveProductData(formData);
     
      dispatch(postProductDataSuccess(res.data.data));
    } catch (error) {
      console.error("postProductDataError error", error);
      dispatch(postProductDataError(error.message));
    }
  };
};