import axios from "axios";
import { BASE_URL} from "./configAPI";

export const NotificationService = {
    createNewNotification: (_data) => {
      return axios({
        url: `${BASE_URL}/notifications/`,
        method: "POST",
        data: _data
      })
    },
    GetListNotification: (_userId) => {
      return axios({
        url: `${BASE_URL}/notifications/${_userId}`,
        method: "GET"
      })
    },

    DeleteNotification: (_id) => {
        return axios({
            url: `${BASE_URL}/notifications/${_id}`,
            method: "DELETE"
        })
    }
}

