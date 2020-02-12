import axios from 'axios'

export const SET_DATA = "SET_DATA";
export const CLEAR_DATA = "CLEAR_DATA";
export const LOADING_DATA = "LOADING_DATA";

export const setData = (data) => ({
  type: SET_DATA,
  data
});

export const clearData = () => ({
  type: CLEAR_DATA
});

export const loadingData = () => ({
  type: LOADING_DATA
});

export const requestData = () => {
  return (dispatch, getState) => {
    dispatch(clearData())
    dispatch(loadingData())
    return new Promise((resolve, reject) => {
      const requestUrl = `${process.env.REACT_APP_API_ENDPOINT}/resource`;
      const state = getState()
      let options = {
        withCredentials: false, //may need but also require to set specific CORS
      }

      if(state.user && state.user.token) {
        options.headers = {
          Authorization: `Bearer ${state.user.token}`
        }
      }

      axios.get(requestUrl, options).then((response) => {
        dispatch(setData(response))
        resolve()
      }).catch((error) => {
        if(error.response.status === 401) {
          // Unauthorize , try to refresh token once before 
          reject({
            action: 'refresh'
          })
        } else {
          reject({
            action: 'login'
          })
        }
        
      })
    })
  }
}
