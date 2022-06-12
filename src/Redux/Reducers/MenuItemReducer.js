const stateDefault = {
    listItem: ["Home", "Desks", "About"],
    isActive: 0,
}

export const MenuItemReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "CHANGE_PAGE":{
        state.isActive = action.key;
        return {...state}
      }

    
      
      default:
          return {...state}
  }
}