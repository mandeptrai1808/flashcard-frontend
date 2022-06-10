const stateDefault = {
    myDesks: [],
    historyDesks: [],
    deskDetail: {},
    cards: [],
    processCard: 1
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

      case "RESET_PROCESSCARD":{
        state.processCard = 1;
        return {...state};
      }

      case "SET_PROCESSCARD": {
        state.processCard = action.content;
        return {...state}
      }

      case "SUFFLE_CARDS": {
        let array = state.cards;
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        state.cards = array;
        return {...state}
      }

      case "UNLIKE_DESK": {
        const likeArray = state.deskDetail.likes.filter(item => item.userId !== action.id);
        state.deskDetail.likes = likeArray;
        return {...state}
      }

      case "LIKE_DESK": {
        state.deskDetail.likes.push({userId: action.id});
        return {...state};
      }

      case "RATE_DESK": {
        state.deskDetail.rates.push({userId: action.id, star: action.star});
        return {...state}
      }

      case "UPDATE_RATE":{
        const index = state.deskDetail.rates.findIndex(item => item.userId === action.id);
        state.deskDetail.rates[index].star = action.star;
        return {...state}
      }
      default:
          return {...state}
  }
}