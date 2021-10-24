import ListType from "./list.type";

const { GET_LIST, PROCESS_OK_LIST, SHOW_CONTEXT } = ListType;

export const getList = (data) => ({
    type: GET_LIST,
    payload: data
});

export const perform = (data) => ({
    type: 'PERFORM',
    payload: data
})

export const processOkList = (data) => ({
    type: PROCESS_OK_LIST,
    payload: data
})

export const showContext = (data) => ({
    type: SHOW_CONTEXT,
    payload: data
})

export const processList = (data) => ({
    type: 'PROCESS_LIST',
    payload: data
})

export const closeModal = () => ({
    type: 'CLOSE_MODAL',
    payload: {}
})

export const closeContext = () => ({
    type: 'CLOSE_CONTEXT',
    payload: {}
})