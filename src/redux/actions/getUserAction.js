import { getUserData } from '../api/getUserApi';
import * as types from './actionsTypes';


export const getUserDataStart = () => {
    return{
        type: types.LOAD_USER_DATA_START,
    }  
};

export const getUserDataSuccess = (data) => {
    console.log("this is get action call----->")
    return{
        type: types.LOAD_USER_DATA_SUCCESS,
        payload: data,
    }  
};

export const getUserDataError = (error) => {
    return{
        type: types.LOAD_USER_DATA_ERROR,
        payload: error,
    } 
}
export const getUserDataActionInitiate = () => {
  return async function (dispatch) {
    dispatch(getUserDataStart());
   
    try {
      const res = await getUserData();
      console.log("getUserData",res);
      
      dispatch(getUserDataSuccess(res));
    } catch (error) {
      console.error("getUserDataError error", error);
      dispatch(getUserDataError(error.message));
    }
  };
};