import { combineReducers } from "redux";
import userEventReducer from "./userEvents";

const rootReducer = combineReducers({
  userEvents: userEventReducer,
});
