import SignType from "./sign.type";

const { SIGN_IN, SIGN_SUCESS, GET_USER, SIGN_OUT, SIGN_OK } = SignType;

export const getUser = () => ({
    type: GET_USER,
    payload: sessionStorage.getItem("username")
});

export const signSucess = (data) => ({
    type: SIGN_SUCESS,
    payload: data
});

export const signIn = (data) => ({
    type: SIGN_IN,
    payload: data
});
export const signOk = (data) => ({
    type: SIGN_OK,
    payload: data
});

export const signOut = () => {
    sessionStorage.removeItem('username');
    return {
        type: SIGN_OUT
    }
}

export const signUp = (data) => ({ type: 'SIGN_UP', payload: data })