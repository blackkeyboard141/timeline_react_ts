import { combineReducers, createStore } from "redux";
import userEventReducer from "./userEvents";

const rootReducer = combineReducers({
  userEvents: userEventReducer,
});

const store = createStore(rootReducer);

export default store;
