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

    GetDeskById: (_id) => {
      return axios({
        url: `${BASE_URL}/desks/${_id}`,
        method: "GET"
      })
    }
}