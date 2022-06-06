const stateDefault = {
    title: "concac"
}

export const TestReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "CHANGE_TITLE":{
        state.title = "xaolon";
        return {...state}
      }  
      default:
          return {...state}
  }
}