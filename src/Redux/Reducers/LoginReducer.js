const stateDefault = {
    isLogin: false,
    isLoading: false
}

export const LoginReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "IS_LOGIN":{
          state.isLogin = !state.isLogin;
          return {...state}
      }

      case "IS_LOADING_BTN": {
        state.isLoading = true;
        return {...state}
      }

      case "IS_LOADED_BTN":{
        state.isLoading = false;
        return {...state}
      }
          
      default:
          return {...state}
  }
}