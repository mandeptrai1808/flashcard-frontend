import { NotificationService } from "../../Services/NotificationService"


export const createNewNotification = (_data) => {
  return async (dispatch) => {
    try {
        let {data} = await NotificationService.createNewNotification(_data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
  }
}

export const GetListNotification = (_userId) => {
  return async (dispatch) => {
    try {
        let {data} = await NotificationService.GetListNotification(_userId);
        dispatch({
            type: "GET_LIST_NOTIFICATION",
            content: data
        })
    } catch (error) {
        console.log(error)
    }
  }
}

export const DeleteNotification = (_id) => {
  return async (dispatch) => {
    try {
        let {data} = await NotificationService.DeleteNotification(_id)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }
}