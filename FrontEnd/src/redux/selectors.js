export const getSessionState = store => store.session;

export const getSession = store => 
  getSessionState(store) ? getSessionState(store).session : {}

export const isLoadingSession = store => {
  return getSessionState(store) ? getSessionState(store).loading : false
}

export const getDataState = store => store.data;
export const getData = store => 
  getDataState(store) ? getDataState(store).data: {}

export const isLoadingData = store => {
  return getDataState(store) ? getDataState(store).loading : false
}