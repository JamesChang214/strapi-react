const INITIAL_STATE = {
  id: 0,
  username: '',
  jwt: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      const { jwt, id, username } = action.payload
      return { ...state, username, id, jwt };
    default:
      return state;
  }
};

export default userReducer;
