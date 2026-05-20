import { putUserApi } from '../api/updateUserApi';
import * as types from './actionsTypes'


export const putUserDataStart=()=>{
    return{
        type:types.UPDATE_USER_DATA_START
    }   
};

export const putUserDataSuccess=(data)=>{
    console.log("this is putdatasuccessaction---->",data)
    return{
        type:types.UPDATE_USER_DATA_SUCCESS,
        payload:data
    }
};

export const putUserDataError=(error)=>{
    console.log("this is putdataerrorsaction---->")
    return{
        type:types.UPDATE_USER_DATA_ERROR,
        payload:error
    }
}
export const putUserDataActionInitiate = (productdata, id) => {
  return async function (dispatch) {
    dispatch(putUserDataStart());

    try {
      const res = await putUserApi(productdata, id);
      dispatch(putUserDataSuccess(res.data));
      return res;
    } catch (error) {
      console.error("putHomeScreenDataError error", error);
      dispatch(putUserDataError(error.message));
      throw error;
    }
  };
};