import { addLevel, addScore } from "../actionCreators";
import {
  ADD_LEVEL_POINT,
  ADD_SCORE_POINT
} from "../actionCreators/caseConstants";

// This is the default state for the reducer
const initialState = {
  levelPoint: 0,
  scorePoint: 0
};

// This is the Reducer which is used to add the level/score based on action type (depending on whether it is add level or add score).
const UserPoints = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LEVEL_POINT:
      return addLevel(state);
    case ADD_SCORE_POINT:
      return addScore(state);
    default:
      return state;
  }
};

export default UserPoints;
