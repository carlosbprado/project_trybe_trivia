import { GET_NAME, INITIAL_REQ } from '../actions';

const INITIAL_STATE = {
  name: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_REQ:
    return state;
  case GET_NAME:
    return {
      name: payload,
    };
  default:
    return state;
  }
};

export default user;
