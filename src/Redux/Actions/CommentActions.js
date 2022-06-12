import { CommentService } from "../../Services/CommentService"


export const CreateNewComment = (_data, _id) => {
  return async (dispatch) => {
    try {
        let {data} = await CommentService.CreateNewComment(_data);
        dispatch(GetCommentsByDeskId(_id));
    } catch (error) {
        console.log(error)
    }
  }
}


export const GetCommentsByDeskId = (_id) => {
  return async (dispatch) => {
    try {
        let {data} = await CommentService.GetCommentsByDeskId(_id);
        dispatch({
            type: "GET_COMMENT_LIST",
            content: data
        })
        dispatch({type: "IS_LOADED"})
    } catch (error) {
        console.log(error)
    }
  }
}