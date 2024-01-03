import axios from "../../utils/axios/axios";
import wrapPromise from "../../utils/suspense/wrapPromise";

const promise = new Promise<any>(async (resolve, reject) => {
  try {
    let result = {
      isNew: false,
      isLoggedIn: false,
    };
    const res = (await axios.get("init/status")).data;
    if (!res.isAuth) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.getAccessToken}`;
      result.isLoggedIn = true;
    }
    if (res.isAuth && res.isNewClient) {
      result.isNew = true;
    }
    if (res.isAuth && !res.isNewClient) {
      //TODO: Log in page loading logic
    }

    resolve(result);
  } catch (err) {
    reject(err);
  }
});

export default wrapPromise(promise);
