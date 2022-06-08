import { CardServices } from "../../Services/CardServices"
import { GetDeskById } from "./DeskAction";


export const CreateNewCard = (_dataNewCard, _deskId) => {
  return async (dispatch) => {
    try {
        let {data} = await CardServices.CreateNewCard(_dataNewCard);
        dispatch(GetDeskById(_deskId));
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
  }
}

export const DeleteCard = (_id, _deskId) => {
  return async (dispatch) => {
    try {
      let {data} = await CardServices.DeteleCard(_id);
      dispatch(GetDeskById(_deskId));

    } catch (error) {
      console.log(error)
    }
  }
}

export const UpdateCard = (_dataUpdate, _id) => {
  return async (dispatch) => {
    try {
      let {data} = await CardServices.UpdateCard(_dataUpdate, _id);
    } catch (error) {
      console.log(error)
    }
  }
}