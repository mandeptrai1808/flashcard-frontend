const stateDefault = {
    myDesks: [],
    historyDesks: []
}

export const DesksReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_MY_DESKS":{
        state.myDesks = action.content;
        return {...state};
      }
          
  
      default:
          return {...state}
  }
}