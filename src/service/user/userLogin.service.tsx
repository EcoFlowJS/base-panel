import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const userLoginService = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  const res: ApiResponse = (
    await axios.post("/auth/users/login", { username, password })
  ).data;

  if (res.success)
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.payload}`;

  return res;
};

export default userLoginService;
