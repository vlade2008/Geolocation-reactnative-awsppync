import { combineReducers } from "redux";
import items from "./items";
import auth from './auth'

// Combine reducers
const AppReducer = combineReducers({
  items,
  auth
});

export default AppReducer;
