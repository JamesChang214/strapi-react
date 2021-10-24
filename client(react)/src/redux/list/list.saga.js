import { takeLatest, call, put, all } from 'redux-saga/effects';
import DefaultValue from "../../defaultValue";

import axios from 'axios';
import {
  processOkList
} from './list.actions';

import ListType from "./list.type";

const { GET_LIST, ADD_LIST, UPDATE_LIST, DELETE_LIST } = ListType;

export const getListAsync = (payload) => {
  return axios.post(`${DefaultValue.BACKEND_URL}getlist`, payload)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function* getListGeneralSaga(data) {
  try {
    const response = yield call(getListAsync, data.payload);
    if (response) {
      let list_data = [];
      response.map((data) => {
        const { id, label, parentId } = data;
        // list_data.push({ id, label, parentId: parentId === 0 ? 'null' : parentId });
        list_data.push({ id, label, parentId, key: `key-${id}` });
        return 1;
      })

      if (!list_data.length) return;
      let list_obj = {}, buffer = [];

      list_data.map((data) => {
        if (list_obj.hasOwnProperty(data.parentId)) {
          buffer = list_obj[data.parentId];
        }

        buffer.push(data);
        list_obj[data.parentId] = buffer;
        buffer = [];
        return 1;
      });

      var count = 0, rate_count = Object.keys(list_obj).length, num, test;

      for (let index = 0; index < rate_count; index++) {
        buffer = Object.keys(list_obj);

        list_obj[buffer[index]].map((data) => {
          buffer.map((target_id) => {
            if (data.id === Number(target_id)) count++;
            return 1;
          })
          return 1;
        })
        if (count === 0) {
          num = buffer[index];

          buffer.map((first) => {
            if (typeof list_obj[first] === 'object')
              list_obj[first].map((second, co) => {
                if (second.id === Number(num)) {
                  list_obj[first][co].nodes = list_obj[num];
                  index = -1;
                  rate_count--;
                  if (buffer.length > 2) {
                    delete list_obj[num];
                  } else {
                    test = num;
                    index = 100;
                  }
                }
                return second;
              })
              return first
          })
        } else {
          count = 0;
        }
      }

      delete list_obj[test]

      let buffer_test = Object.keys(list_obj);
      buffer = [];
      buffer_test.map((data) => {
        list_obj[data].map((t) => {
          buffer.push(t);
          return t;
        })
        return data;
      });

      yield put(processOkList(buffer));
      // yield put(processOkList(response));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getListGeneral() {
  yield takeLatest(GET_LIST, getListGeneralSaga);
}

export function* deleteListGeneral() {
  yield takeLatest(DELETE_LIST, getListGeneralSaga);
}

export function* updateListGeneral() {
  yield takeLatest(UPDATE_LIST, getListGeneralSaga);
}

export function* addListGeneral() {
  yield takeLatest(ADD_LIST, getListGeneralSaga);
}

export function* getListSaga() {
  yield all([
    call(getListGeneral),
    call(deleteListGeneral),
    call(updateListGeneral),
    call(addListGeneral),
  ]);
}
