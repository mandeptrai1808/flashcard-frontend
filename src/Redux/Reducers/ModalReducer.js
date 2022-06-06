const stateDefault = {
    visible: false,
    content: "",
    title: ""
}

export const ModalReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "OPEN_MODAL":{
          state.visible = true;
          state.content = action.content;
          state.title = action.title;
          return {...state}
      }

      case "CLOSE_MODAL": {
          state.visible = false;
          return {...state}
      }
          
  
      default:
        return {...state}
    }
}