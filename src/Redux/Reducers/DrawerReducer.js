const stateDefault = {
  visible: false,
  content: "",
  placement: "right",
};

export const DrawerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "OPEN_DRAWER":{
            state.visible = true;
            state.content = action.content;
            state.placement = action.placement;
            return {...state}
        }
            
        case "CLOSE_DRAWER": {
            state.visible = false;
            return {...state};
        }
        default:
            return {...state}
    }
}
