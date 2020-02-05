import { SET_SESSION, CLEAR_SESSION, LOADING_SESSION } from "../actions/session";

const initialState = {
  session: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SESSION: {
      const { session } = action;
      return {
        ...state,
        session: session,
        loading: false
      };
    }
    case CLEAR_SESSION: {
      return {
        ...state,
        session: null,
        loading: false
      };
    }
    case LOADING_SESSION: {
      return {
        ...state,
        loading: true
      }
    }
    default:
      return state;
  }
}
