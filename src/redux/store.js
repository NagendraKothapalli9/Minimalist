import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import {rootReducer} from "./Reducer/rootReducer";
import { thunk } from "redux-thunk";
const middleware = [thunk];
 
const store = createStore(rootReducer, applyMiddleware(...middleware));
export default store;
