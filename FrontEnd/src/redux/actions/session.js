import axios from 'axios'

export const SET_SESSION = "SET_SESSION";
export const CLEAR_SESSION = "CLEAR_SESSION";
export const LOADING_SESSION = "LOADING_SESSION";

export const setSession = (session) => ({
  type: SET_SESSION,
  session
});

export const clearSession = () => {
  return {
    type: CLEAR_SESSION
  }
};

export const loadingSession = () => ({
  type: LOADING_SESSION
});

export const login = () => {
  // TODO: change url
  return (dispatch) => {
    const cognitoUrl = `${process.env.REACT_APP_COGNITO_ENDPOINT}/login?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${window.origin}/callback`;
    window.open(cognitoUrl, '_blank')
  }
}

export const exchangeAuthCode = () => {
  return (dispatch) => {
    dispatch(loadingSession())
    return new Promise((resolve, reject) => {
      const exchangeUrl = `${process.env.REACT_APP_TARGET_SERVER}/auth`
      const auth_code = window.localStorage.getItem('auth_code')
      axios.get(exchangeUrl, {
        params: {
          code: auth_code
        }
      }).then((response) => {
        if(response.status === 200) {
          dispatch(setSession(response.data))
          resolve()
        } else {
          reject(new Error('no login data'))
        }
      }).catch((error) => {
        reject(error)
      })
    })
    
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(clearSession())
    window.localStorage.removeItem('auth_code')
    const logoutUrl = `${process.env.REACT_APP_COGNITO_ENDPOINT}/logout?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&logout_uri=${window.origin}`;
    console.log(logoutUrl)
    window.location = logoutUrl
  }
}
