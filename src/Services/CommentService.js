import axios from "axios";
import { BASE_URL } from "./configAPI";

export const CommentService = {
    CreateNewComment: (_data) => {
      return axios({
        url: `${BASE_URL}/comments/newcomment`,
        method: "POST",
        data: _data
      })
    },

    GetCommentsByDeskId: (_id) => {
      return axios({
        url: `${BASE_URL}/comments/${_id}`,
        method: "GET"
      })
    }
}