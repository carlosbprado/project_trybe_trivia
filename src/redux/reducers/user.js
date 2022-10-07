import { GET_NAME, GET_EMAIL, INITIAL_REQ } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_REQ:
    return state;
  case GET_NAME:
    return {
      ...state,
      name: payload,
    };
  case GET_EMAIL:
    return {
      ...state,
      email: payload,
    };

  default:
    return state;
  }
};

export default user;
