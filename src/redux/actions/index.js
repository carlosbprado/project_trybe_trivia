export const GET_USER = 'GET_USER';
export const INITIAL_REQ = 'INITIAL_REQ';
export const GET_API = 'GET_API';
export const initialRequest = () => ({ type: INITIAL_REQ });

const NUMBER = 3;

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const responseAPI = (payload) => ({
  type: GET_API,
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
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  if (result.response_code === NUMBER) {
    localStorage.removeItem('token');
    history.push('/');
  } else {
    localStorage.setItem('token', token);
    dispatch(responseAPI(result.results));
  }
};
