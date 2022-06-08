const stateDefault = {
    myDesks: [],
    historyDesks: [],
    deskDetail: {},
    cards: []
}

export const DesksReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_MY_DESKS":{
        state.myDesks = action.content;
        return {...state};
      }

      case "GET_DESK_DETAIL":{
        state.deskDetail = action.desk;
        state.cards = action.cards;
        return {...state};
      }
      
      case  "UPDATE_FRONT_CARD":{
        state.cards[action.id].frontContent = action.content;
        return {...state}
      }

      case "UPDATE_BACK_CARD":{
        state.cards[action.id].backContent = action.content;
        return {...state}
      }

      case "UPDATE_IMAGE": {
        state.cards[action.id].imageUrl = action.content;
        return {...state}
      }

      default:
          return {...state}
  }
}