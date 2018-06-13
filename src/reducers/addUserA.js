import { addUserA } from "../actionCreators";
import { ADD_USER_A } from "../actionCreators/caseConstants";

// This is the default state for the reducer
const initialState = [];
// This Reducer is used for adding the User A to the Redux store
const UserA = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_A:
      return addUserA(state, action);
    default:
      return state;
  }
};

export default UserA;
