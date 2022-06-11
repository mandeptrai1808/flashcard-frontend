import { UserService } from "../../Services/UserService"
import { notification } from 'antd';
import Login from "../../Components/Login";
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
export const LoginUser = (_dataLogin) => {
  return async (dispatch) => {
    try {
        let {data} = await UserService.Login(_dataLogin);
        successNotification("Đăng nhập thành công", "Bạn đã đăng nhập thằng công!!")

        localStorage.setItem('login_user', JSON.stringify(data.userFind));
        localStorage.setItem('access_token', data.token);
        dispatch({type: "CLOSE_DRAWER"});
        dispatch({type: "IS_LOGIN"});
        window.location.reload()
    } catch (error) {
      errorNotification("Đăng nhập thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
    }
  }
}

export const SignUpUser = (_dataSignUp) => {
  return async (dispatch) => {
    try {
      let {data} = await UserService.SignUp(_dataSignUp);
      successNotification("Đăng ký thành công", "Bạn đã đăng ký tài khoản thành công!!")
      dispatch({
        type: "OPEN_DRAWER", 
        content: <Login/>,
        placement: "right"
      })

    } catch (error) {
      errorNotification("Đăng ký thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
      
    }
  }
}

export const UpdateUser = (_data, _id) => {
  return async (dispatch) => {
    try {
      let {data} = await UserService.UpdateUser(_data, _id);
      localStorage.setItem('login_user', JSON.stringify(data.userFind));
      dispatch({type: "IS_LOGIN"});
      successNotification("Updated success!", "Bạn đã cập nhật tài khoản thành công!!")

      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
}