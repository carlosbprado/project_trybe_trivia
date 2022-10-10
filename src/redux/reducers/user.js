import { GET_USER, INITIAL_REQ } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_REQ:
    return state;

  case GET_USER:
    return {
      ...state,
      email: payload.email,
      name: payload.name,
    };

  default:
    return state;
  }
};

export default user;
