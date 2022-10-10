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
  const localStorageToken = JSON.parse(localStorage.getItem('token'));
  if (localStorageToken) {
    return localStorageToken;
  }
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await response.json();
  return result;
};

const tokenValidate = async () => {
  const tokenResponse = await getToken();
  const token = tokenResponse.response_code === NUMBER
    ? await getToken() : tokenResponse.token;
  localStorage.setItem('token', token);
  return token;
};

export const requestAPI = () => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${await tokenValidate()}`);
  const result = await response.json();
  dispatch(responseAPI(result));
};

// export const requestAPI = () => async (dispatch) => {
//   const localStorageToken = localStorage.getItem('token');
//   const newToken = localStorageToken || (await getToken());
//   localStorage.setItem('token', newToken);
//   dispatch(initialRequest());
//   const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
//   const result = await response.json();
//   if (result.response_code === number) {
//     const newNewToken = await getToken();
//     localStorage.setItem('token', newNewToken);
//     const newResponse = await fetch(
//       `https://opentdb.com/api.php?amount=5&token=${newNewToken}`,
//     );
//     const newResult = await newResponse.json();
//     dispatch(responseAPI(newResult));
//   } else {
//     dispatch(responseAPI(result));
//   }
// };
