export const INITIAL_REQ = 'INITIAL_REQ';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const SAVE_PLAYER = 'SAVE_PLAYER';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const updateAssertions = (payload) => ({
  type: UPDATE_ASSERTIONS,
  payload,
});

export const initialRequest = () => ({ type: INITIAL_REQ });

export const responseAPI = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

const getToken = async () => {
  const localStorageToken = localStorage.getItem('token');
  if (localStorageToken) return localStorageToken;
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  return result.token;
};

export const requestAPI = (history) => async (dispatch) => {
  const ERROR_CODE = 3;
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  if (result.response_code === ERROR_CODE) {
    localStorage.removeItem('token');
    history.push('/');
  } else {
    localStorage.setItem('token', token);
    dispatch(responseAPI(result.results));
    history.push('/game');
  }
};
