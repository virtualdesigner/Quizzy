import { addOriginalQA } from "../actionCreators";
import { ADD_ORIGINAL_QA } from "../actionCreators/caseConstants";

// This is the default state for the reducer
const initialState = [];
// This is the reducer used for adding original QA to the Redux store
const OriginalQA = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORIGINAL_QA:
      return addOriginalQA(state, action);
    default:
      return state;
  }
};

export default OriginalQA;
