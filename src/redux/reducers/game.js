import { GET_API } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const game = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_API:
    return {
      ...state,
      questions: [...payload],
    };
  default:
    return state;
  }
};

export default game;
