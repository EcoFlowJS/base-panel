import userSignoutService from "../../../service/user/userSignout.service";

const logoutHandler = (setLogout: any) => {
  userSignoutService().then((response) => {
    if (response.success) setLogout(true);
  });
};

export default logoutHandler;
