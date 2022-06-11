import axios from 'axios';
import { BASE_URL} from './configAPI';

export const DeskService = {
    CreateDesk: (_dataNewDesk) => {
      return axios({
          url: `${BASE_URL}/desks/`,
          method: "POST",
          data: _dataNewDesk
      })
    },
    GetDesksByUserId: (_userId) => {
      return axios({
          url: `${BASE_URL}/desks/getdesks/${_userId}`,
          method: "GET"
      })
    },

    GetLikedDeskByUserId: (_userId) => {
      return axios({
        url: `${BASE_URL}/desks/getdesksliked/${_userId}`,
        method: "GET"
    })
    },

    GetHistoryDesksByUserId: (_userId) => {
      return axios({
        url: `${BASE_URL}/desks/gethistories/${_userId}`,
        method: "GET"
      })
    },

    GetDeskById: (_id) => {
      return axios({
        url: `${BASE_URL}/desks/${_id}`,
        method: "GET"
      })
    },

    UserLikeDesk: (_data) => {
      return axios({
        url: `${BASE_URL}/likes/likedesk`,
        data: _data,
        method: "POST"
      })      
    },

    UserUnlikeDesk: (_data) => {
      return axios({
        url: `${BASE_URL}/likes/unlikedesk`,
        data: _data,
        method: "DELETE"
      })
    },

    UserRateDesk: (_data) => {
      return axios({
        url: `${BASE_URL}/rates`,
        data: _data,
        method: "POST"
      })
    },

    UserUpdateRateDesk: (_data) => {
      return axios({
        url: `${BASE_URL}/rates`,
        data: _data,
        method: "PUT"
      })
    },

    UpdateDesk: (_data, _id) => {
      return axios({
        url: `${BASE_URL}/desks/update/${_id}`,
        method: "PUT",
        data: _data
      })
    },

    DeleteDesk: (_id) => {
      return axios({
        url: `${BASE_URL}/desks/delete/${_id}`,
        method: "DELETE"
      })
    },

    PushHistories: (_data) => {
      return axios({
        url: `${BASE_URL}/history/push`,
        method: "POST",
        data: _data
      })
    }
}