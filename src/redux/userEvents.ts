import { AnyAction, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";

interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

interface UserEventState {
  byIds: Record<UserEvent["id"], UserEvent>; //userevent id
  allIds: UserEvent["id"][]; // array of list of ids of user events
}

const LOAD_REQUEST = "userEvents/load_request";

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_SUCCESS = "userEvents/load_success";

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: UserEvent[];
  };
}

export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadRequestAction | LoadSuccessAction
> => async (dispatch, getState) => {
  dispatch({
    type: LOAD_REQUEST,
  });

  try {
    const response = await fetch("http://localhost:3001/events");
    const events: UserEvent[] = await response.json(); // note: TS-API

    dispatch({
      type: LOAD_SUCCESS,
      payload: { events },
    });
  } catch (error) {}
};

const initialState: UserEventState = {
  byIds: {},
  allIds: [],
};

const userEventReducer = (
  state: UserEventState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userEventReducer;
