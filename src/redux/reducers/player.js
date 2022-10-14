import {
  SAVE_PLAYER,
  UPDATE_ASSERTIONS,
  UPDATE_SCORE,
  GET_QUESTIONS,
  SAVE_PROFILE_PICTURE,
  RESET_STATES,
  INITIAL_REQ,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  profilePicture: '',
  questions: [],
  loading: false,
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_REQ:
    return { ...state, loading: true };

  case SAVE_PLAYER:
    return {
      ...state,
      gravatarEmail: payload.email,
      name: payload.name,
    };

  case SAVE_PROFILE_PICTURE:
    return {
      ...state,
      profilePicture: payload,
    };

  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + payload,
    };

  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };

  case RESET_STATES:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      profilePicture: '',
    };

  case GET_QUESTIONS:
    return {
      ...state,
      questions: [...payload],
      loading: false,
    };
  default:
    return state;
  }
};

export default user;
