import { toggleActive, toggleCompleted } from "../actionCreators";
import {
  TOGGLE_ACTIVE,
  TOGGLE_COMPLETED
} from "../actionCreators/caseConstants";

// This is the default state for the reducer
const initialState = {
  active: false,
  completed: false
};

// This reducer is used for toggling the 'active' & 'completed' corresponding to the action payload
const Toggle = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVE:
      return toggleActive(state, action);
    case TOGGLE_COMPLETED:
      return toggleCompleted(state, action);
    default:
      return state;
  }
};

export default Toggle;
