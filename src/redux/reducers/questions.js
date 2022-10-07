import { GET_API } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const questions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_API:
    return {
      ...state,
      questions: [payload.results],
    };
  default:
    return state;
  }
};

export default questions;
