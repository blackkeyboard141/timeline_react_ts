import { AnyAction } from "redux";

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
