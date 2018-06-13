// Here are the Action Creators, which will return appropriate state based on the action.

export const addOriginalQA = (state, action) => {
  return [...state, { ques: action.payload.ques, ans: action.payload.ans }];
};

export const addUserA = (state, action) => {
  return [...state, action.payload.ans];
};

export const toggleActive = (state, action) => {
  return { ...state, active: action.payload };
};

export const toggleCompleted = (state, action) => {
  return { ...state, completed: action.payload };
};

export const addLevel = state => {
  return { ...state, levelPoint: state.levelPoint + 1 };
};

export const addScore = state => {
  return { ...state, scorePoint: state.scorePoint + 1 };
};
