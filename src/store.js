import { createStore, applyMiddleware, compose } from "redux";

// Logger consoles the state of the app after every update.
import logger from "redux-logger";

import reducers from "./reducers";

// applyMiddleware function is used to combine two or more middlewares. In here, i just used it for example/practice/test purpose.see the uses in here https://redux.js.org/api-reference/applymiddleware
const middleware = applyMiddleware(logger);

// createStore creates the redux store. First Argument: A Reducer (Required), Second or Third Argument: (Accepted if any)
/* TIPS: createStore takes up to 3 arguments. If the second argument is a function it assumes that your second argument is the store enhancer. If it is an object or there are 3 arguments present it assumes that the argument is your initial state
*/
const store = createStore(
  reducers,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
