const stateDefault = {
    myDesks: [],
    likedDesk: [],
    historyDesks: [],
    deskDetail: {},
    cards: [],
    allDesks: [],
    loadItem: true,
    processCard: 1,
    searchData: []
}

export const DesksReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_MY_DESKS":{
        state.myDesks = action.content;
        return {...state};
      }

      case "GET_ALL_DESK": {
        let arr = action.content?.filter(item => item.status !== "PRIVATE");
        if (arr.length > 0)
        arr.sort((a,b) => {
          return (b.likes?.length - a.likes?.length)
        })
        state.allDesks = arr;
        return {...state}
      }

      case "GET_DESK_DETAIL":{
        state.deskDetail = action.desk;
        state.cards = action.cards;
        return {...state};
      }

      case "GET_SEARCH_DATA": {
        state.searchData = action.content.filter(item => item.status !== "PRIVATE");
        return {...state}
      }

      case "GET_MY_HISTORY":{
        let array = action.content;
        // console.log(array)
        if (array.length > 0)
        array.sort((item_a, item_b) => {
          return (item_b.history_id - item_a.history_id)
        })
        state.historyDesks = array;
        return {...state}
      }

      case "GET_LIKED_DESKS": {
        state.likedDesks = action.content;
        return {...state}
      }
      case "UPDATE_DESK": {
        state.deskDetail.name = action.name;
        return {...state}
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

      case "IS_LOADED":{
        state.loadItem = false
        return {...state}
      }

      case "IS_LOADING":{
        state.loadItem = true;
        return {...state}
      }
      default:
          return {...state}
  }
}