import { DeskService } from "../../Services/DeskServices";
import { notification } from "antd";
const successNotification = (_tittle, _content) => {
  notification["success"]({
    message: _tittle,
    description: _content,
  });
};

const errorNotification = (_tittle, _content) => {
  notification["error"]({
    message: _tittle,
    description: _content,
  });
};

let userData = localStorage.getItem("login_user");
userData = userData && JSON.parse(userData);

export const GetDesksByUserId = (_userId) => {
  return async (dispatch) => {
    try {
      let { data } = await DeskService.GetDesksByUserId(_userId);
      dispatch({
        type: "GET_MY_DESKS",
        content: data,
      });
      dispatch({type: "IS_LOADED"})

    } catch (error) {
      console.log(error);
    }
  };
};

export const GetLikedDesksByUserId = (_userId) => {
  return async (dispatch) => {
    try {
      let { data } = await DeskService.GetLikedDeskByUserId(_userId);
      dispatch({
        type: "GET_LIKED_DESKS",
        content: data,
      });
      dispatch({type: "IS_LOADED"})

    } catch (error) {
      console.log(error);
    }
  };
};

export const GetHistoryDesksByUserId = (_userId) => {
  return async (dispatch) => {
    try {
      let { data } = await DeskService.GetHistoryDesksByUserId(_userId);
      dispatch({
        type: "GET_MY_HISTORY",
        content: data,
      });
      dispatch({type: "IS_LOADED"})
    } catch (error) {
      console.log(error);
    }
  };
};

  export const GetAllDesk = () => {
    return async (dispatch) => {
      try {
        let {data} = await DeskService.GetAllDesks();
        dispatch({
          type: "GET_ALL_DESK",
          content: data,
        });
        
      } catch (error) {
        console.log(error);        
      }
    }
  }

export const CreateDeskApi = (_dataNewDesk) => {
  return async (dispatch) => {
    try {
      let { data } = await DeskService.CreateDesk(_dataNewDesk);
      successNotification(
        "Tạo desk thành công",
        "Bạn đã tạo desk thành công!!"
      );
      dispatch({ type: "CLOSE_MODAL" });
      dispatch(GetDesksByUserId(userData.id));
      dispatch({type: "IS_LOADED_BTN"});
      window.location.reload()
    } catch (error) {
      console.log(error);
      dispatch({type: "IS_LOADED_BTN"});
      errorNotification("Có lỗi xảy ra", "Kiểm tra đường truyền!");
    }
  };
};

export const GetDeskById = (_id) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.GetDeskById(_id);
      dispatch({type: "IS_LOADED_BTN"})
      dispatch({
        type: "GET_DESK_DETAIL",
        desk: data.desk,
        cards: data.cards
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

export const UserLikeDesk = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.UserLikeDesk(_data);  
    } catch (error) {
      console.log(error)
    }
  }  
}

export const UserUnlikeDesk = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.UserUnlikeDesk(_data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const UserRateDesk = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.UserRateDesk(_data);
    } catch (error) {
      console.log(error)
    }
  }
}

export const UserUpdateRateDesk = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.UserUpdateRateDesk(_data);
    } catch (error) {
      console.log(error)
    }
  }
}

export const UpdateDesk = (_data, _id) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.UpdateDesk(_data, _id);
    } catch (error) {
      console.log(error)
    }
  }
}

export const DeleteDesk = (_id, _userId) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.DeleteDesk(_id);
      successNotification(
        "Deleted desk!",
        "Bạn đã xóa desk thành công!!"
      );
      await dispatch(GetDesksByUserId(_userId))
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
}

export const PushHistories = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.PushHistories(_data);
    } catch (error) {
      console.log(error)
    }
  }
}

export const SearchDesks = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await DeskService.SearchDesks(_data);
      dispatch({
        type: "GET_SEARCH_DATA",
        content: data
      })
      dispatch({type: "IS_LOADED"})
    } catch (error) {
      console.log(error);
    }
  }
}