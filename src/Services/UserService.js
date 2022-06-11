import axios from 'axios';
import { BASE_URL} from './configAPI';

export const UserService = {
    Login: (_dataLogin) => {
      return axios({
          url: `${BASE_URL}/users/login`,
          data: _dataLogin,
          method: "POST"
      })
    },
    SignUp: (_dataSignUp) => {
      return axios({
        url: `${BASE_URL}/users/`,
        data: _dataSignUp,
        method: "POST"
      })
    },

    UpdateUser: (_data, _id) => {
      return axios({
        url: `${BASE_URL}/users/update/${_id}`,
        method: "PUT",
        data: _data
      })
    }
}