export const getUserState = store => store.user;

export const getUserToken = store => getUserState(store) ? getUserState(store).token : {}

export const getUserInfo = store => getUserState(store) ? getUserState(store).info : {}

export const getDataState = store => {
  return store.data;
}

export const getData = store => {
  return getDataState(store) ? getDataState(store).data: {}
}

export const isLoadingData = store => {
  return getDataState(store) ? getDataState(store).loading : false
}