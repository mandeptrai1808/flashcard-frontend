import axios from 'axios';
import { BASE_URL} from './configAPI';

export const CardServices = {
    CreateNewCard: (_dataNewCard) => {
      return axios({
          url: `${BASE_URL}/cards/`,
          method: "POST",
          data: _dataNewCard
      })
    },
     UpdateCard: (_dataUpdate, _id) => {
       return axios({
         url: `${BASE_URL}/cards/${_id}`,
         method: "PUT",
         data: _dataUpdate
       })
     },
     DeteleCard: (_id) => {
       return axios({
         url: `${BASE_URL}/cards/${_id}`,
         method: "DELETE"
       })
     }
}