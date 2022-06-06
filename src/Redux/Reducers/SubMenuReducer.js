const stateDefault = {
    visible: false
}

export const SubMenuReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "TOUCH_SUBMENU":{
            state.visible = !state.visible;
            return {...state};
        }

      

    
        default:
            return {...state}
    }
}