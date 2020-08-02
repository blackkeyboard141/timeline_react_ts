import { combineReducers, createStore, applyMiddleware } from "redux";
import userEventReducer from "./userEvents";
import recorderReducer from "./recorder";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userEvents: userEventReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
