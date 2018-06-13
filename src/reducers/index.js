import { combineReducers } from "redux";

import OriginalQA from "./addOriginalQA";
import UserA from "./addUserA";
import UserPoints from "./userPoints";
import Toggle from "./toggle";

// In here, we are combining the reducers in different files to a single root by using combineReducers function. Remember, if we don't use combineReducers, we have to pack all the reducers in a single file.
const reducers = combineReducers({
  OriginalQA,
  UserA,
  UserPoints,
  Toggle
});

export default reducers;
