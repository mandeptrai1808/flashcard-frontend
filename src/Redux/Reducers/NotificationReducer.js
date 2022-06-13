const stateDefault = {
    listNotification: []
}


export const NotificationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_NOTIFICATION":{
        state.listNotification = action.content;
        return {...state}
    }        
    
    case "DELETE_NOTIFICATION": {
      state.listNotification = state.listNotification.filter(item => item.id !== action.id);
      return {...state}
    }
    default:
        return {...state}
  }
}