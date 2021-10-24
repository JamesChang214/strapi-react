const INITIAL_STATE = {
  datas: []
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, datas: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
