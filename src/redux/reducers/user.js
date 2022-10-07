import { GET_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_NAME:
    return {
      name: payload,
    };
  default:
    return state;
  }
};

export default user;
