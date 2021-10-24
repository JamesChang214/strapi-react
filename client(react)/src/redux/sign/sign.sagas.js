import { takeLatest, call, put, all } from 'redux-saga/effects';
import DefaultValue from "../../defaultValue";

import axios from 'axios';
import {
  signSucess,
  signOk
} from './sign.actions';

import SignType from './sign.type';

const { SIGN_IN } = SignType;

export const getDatas = (payload) => {
  return axios.post(`${DefaultValue.BACKEND_URL}user`, payload)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function* signUser(data) {
  try {
    const response = yield call(getDatas, data.payload);
    if (response.length) {
      sessionStorage.setItem("username", response[0].user_name);
      yield put(signSucess(response[0].user_name));
    }
  } catch (error) {
    console.log(error);
  }
}



export const registorUser = (payload) => {
  return axios.post(`${DefaultValue.BACKEND_URL}registor`, payload)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function* signUpSaga(data) {
  try {
    const response = yield call(registorUser, data.payload);
    if (response === 1) {
      yield put(signOk("ok"));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(SIGN_IN, signUser);
}

export function* signUpStart() {
  yield takeLatest('SIGN_UP', signUpSaga);
}

export function* signSaga() {
  yield all([
    call(fetchCollectionsStart),
    call(signUpStart)]);
}
