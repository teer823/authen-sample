import { SET_USER, CLEAR_USER } from "../actions/user";

const initialState = {
  token: null,
  info: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const { token, info } = action;
      return {
        ...state,
        token : token,
        info : info
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        token: null,
        info: null
      }
    }
    default:
      return state;
  }
}
