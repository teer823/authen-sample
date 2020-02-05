import { SET_DATA, CLEAR_DATA, LOADING_DATA} from "../actions/data";

const initialState = {
  data: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATA: {
      const { data } = action;
      return {
        ...state,
        data: data,
        loading: false
      };
    }
    case CLEAR_DATA: {
      return {
        ...state,
        data: {},
        loading: false
      };
    }
    case LOADING_DATA: {
      return {
        ...state,
        loading: true
      }
    }
    default:
      return state;
  }
}
