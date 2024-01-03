import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "http://localhost:4000/systemApi/";
instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const response = await axios.put(
        "users/genTokens",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["token"]}`;

        return axios(error.config);
      }
    }
    return error;
  }
);

export default instance;
