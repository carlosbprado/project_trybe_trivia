export const GET_NAME = 'GET_NAME';
export const INITIAL_REQ = 'INITIAL_REQ';
export const GET_API = 'GET_API';

export const initialRequest = () => ({ type: INITIAL_REQ });
const number = 3;

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const responseAPI = (payload) => ({
  type: GET_API,
  payload,
});

const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  // const { token } = result;
  // return token;
  return result.token;
};
// OBS: possivelmente será necessário passar o objeto inteiro na getToken.

export const requestAPI = () => async (dispatch) => {
  const localStorageToken = JSON.parse(localStorage.getItem('token'));
  const newToken = localStorageToken || getToken();
  localStorage.setItem('token', JSON.stringify(newToken));
  dispatch(initialRequest());
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
  const result = await response.json();
  if (result.response_code === number) {
    const newNewToken = getToken();
    localStorage.setItem('token', JSON.stringify(newNewToken));
    const newResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${newNewToken}`);
    const newResult = await newResponse.json();
    dispatch(responseAPI(newResult));
  } else {
    dispatch(responseAPI(result));
  }
};
