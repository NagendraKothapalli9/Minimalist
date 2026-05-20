import { saveUserData } from '../api/addUserApi';
import * as types from './actionsTypes'


export const postUserDataStart=()=>{
    return{
        type:types.CREATE_USER_DATA_START
    }   
};

export const postUserDataSuccess=(data)=>{
    console.log("this is postdatasuccessaction---->",data)
    return{
        type:types.CREATE_USER_DATA_SUCCESS,
        payload:data
    }
};

export const postUserDataError=(error)=>{
    console.log("this is postdataerrorsaction---->")
    return{
        type:types.CREATE_USER_DATA_ERROR,
        payload:error
    }
}
export const postUserDataActionInitiate = (formData) => {
  return async function (dispatch) {
    dispatch(postUserDataStart());
   
 
    try {
      const res = await saveUserData(formData);
     
      dispatch(postUserDataSuccess(res.data.data));
    } catch (error) {
      console.error("postUserDataError error", error);
      dispatch(postUserDataError(error.message));
    }
  };
};