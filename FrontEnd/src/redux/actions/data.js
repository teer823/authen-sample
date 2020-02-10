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

      axios.get(requestUrl, options).then((result) => {
        dispatch(setData(result))
        resolve()
      }).catch((error) => {
        console.log('error')
        dispatch(setData(error))
        reject()
      })
    })
  }
}
