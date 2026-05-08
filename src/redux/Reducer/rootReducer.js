import { combineReducers } from "redux";
import { getReducer } from "./getProductReducer";
import { postReducer } from "./addProductReducer";
import { deleteReducer } from "./deleteProductReducer";
import { putReducer } from "./updateProductReducer";

export const rootReducer=combineReducers({
   getproductdata:getReducer,
   postproductdata:postReducer,
   deleteproductdata:deleteReducer,
   updateproductdata:putReducer
})