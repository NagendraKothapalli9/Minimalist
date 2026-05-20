import { combineReducers } from "redux";
import { getReducer } from "./getProductReducer";
import { postReducer } from "./addProductReducer";
import { deleteReducer } from "./deleteProductReducer";
import { putReducer } from "./updateProductReducer";
import { getUserReducer } from "./getUserReducer";
import { postUserReducer } from "./addUserReducer";
import { putUserReducer } from "./updateUserReducer";


export const rootReducer=combineReducers({
   getproductdata:getReducer,
   postproductdata:postReducer,
   deleteproductdata:deleteReducer,
   updateproductdata:putReducer,
   getuserdata:getUserReducer,
   postuserdata:postUserReducer,
    updateuserdata:putUserReducer,
})