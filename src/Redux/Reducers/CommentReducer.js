const stateDefault = {
    listComment: []
}

export const CommentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_COMMENT_LIST":{
        state.listComment = action.content.sort((a,b) => {
          return b.id - a.id
        })
        return {...state}
    }
        
  
    default:
        return {...state}
  }
}