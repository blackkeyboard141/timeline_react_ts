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

//action set
const LOAD_REQUEST = "userEvents/load_request";

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}
// -----

const LOAD_SUCCESS = "userEvents/load_success";

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: UserEvent[];
  };
}

const ERROR_EVENT = "userEvents/error_event";

interface ErrorEventAction extends Action<typeof ERROR_EVENT> {
  payload: {
    errorMessage: string;
  };
}

export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadRequestAction | LoadSuccessAction | ErrorEventAction
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
  } catch (e) {
    dispatch({
      type: ERROR_EVENT,
      payload: { errorMessage: "failed to load" },
    });
  }
};

const selectUserEventsState = (rootState: RootState) => rootState.userEvents; //I am guessing this returns

export const selectUserEventsArray = (rootState: RootState) => {
  const state = selectUserEventsState(rootState);
  return state.allIds.map((id) => state.byIds[id]);
};

const initialState: UserEventState = {
  byIds: {},
  allIds: [],
};

//reducers
const userEventReducer = (
  state: UserEventState = initialState,
  action: LoadSuccessAction
) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      const { events } = action.payload;
      //please decipher
      return {
        ...state,
        allIds: events.map(({ id }) => id),
        byIds: events.reduce<UserEventState["byIds"]>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {}),
      };

    default:
      return state;
  }
};

export default userEventReducer;
