import axios from 'axios'
import Cookies from 'universal-cookie';

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

const cookies = new Cookies();

export const setUser = (user) => ({
  type: SET_USER,
  token: user.token,
  info: user.info
});

export const clearUser = () => {
  return {
    type: CLEAR_USER
  }
};

export const login = (email, password) => {
  return (dispatch) => {
    return new Promise((resolve ,reject) => {
      const loginUrl = `${process.env.REACT_APP_API_ENDPOINT}/login`
      const data = {
        email,
        password
      }
      axios.post(loginUrl, data).then((response) => {
        console.log(response.data)
        const userInfo = {
          token: response.data.token,
          info: response.data.info
        }
        cookies.set('user', userInfo, {
          maxAge: response.data.expire_in
        })
        dispatch(setUser(userInfo))
        resolve(userInfo)
      }).catch((error) => {
        console.log(error);
        reject(error)
      })
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    cookies.remove('user')
    dispatch(clearUser())
    console.log('logout')
  }
}
