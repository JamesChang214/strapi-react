import ListType from "./list.type";

const { GET_LIST, PROCESS_OK_LIST, SHOW_CONTEXT } = ListType;

const INITIAL_STATE = {
    tree_data: [],
    position_x: 0,
    position_y: 0,
    select_id: 0,
    con_v: false,
    type: '',
    modal: false,
};

const listReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST:
            return { ...state };
        case 'PERFORM':
            return { ...state };        
        case PROCESS_OK_LIST:
            return { ...state, tree_data: action.payload, modal: false };
        case 'CLOSE_MODAL':
            return { ...state, modal: false };
        case 'CLOSE_CONTEXT':
            return { ...state, con_v: false };
        case 'PROCESS_LIST':
            return { ...state, type: action.payload.type, con_v: false, modal: action.payload.type !== 'delete' };
        case SHOW_CONTEXT:
            return {
                ...state, con_v: action.payload.con_v, position_x: action.payload.position_x,
                position_y: action.payload.position_y, select_id: action.payload.select_id, type: action.payload.type
            };
        default:
            return state;
    }
};

export default listReducer;