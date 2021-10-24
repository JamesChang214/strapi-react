import SignType from "./sign.type";
const { SIGN_IN, SIGN_SUCESS, GET_USER, SIGN_OUT, SIGN_OK } = SignType;

const INITIAL_STATE = {
    userName: null,
    sign_ok: null
};

const signReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, userName: action.payload };
        case SIGN_SUCESS:
            return { ...state, userName: action.payload };
        case SIGN_IN:
            return { ...state };
        case SIGN_OUT:
            return { ...state, userName: null };
        case SIGN_OK:
            return { ...state, sign_ok: action.payload };
        default:
            return state;
    }
};

export default signReducer;
