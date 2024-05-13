import { ApiResponse } from "@ecoflow/types";
import userLoginService from "../../../service/user/userLogin.service";
import { Dispatch, SetStateAction } from "react";

const submitHandler = (
  _checkStatus: boolean,
  formValue: Record<string, any>,
  setResponse: Dispatch<SetStateAction<ApiResponse>>
) => {
  let isUsername = false;
  let isPassword = false;
  let isPasswordLength = false;
  let isPasswordRegex = false;
  const { username, password } = formValue;

  if (username.trim().length === 0) isUsername = true;

  if (password.length === 0) isPassword = true;

  if (password.length < 8) isPasswordLength = true;

  if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))
    isPasswordRegex = true;

  if (isUsername && isPassword) {
    setResponse({ error: true, payload: "Enter username and password." });
    return;
  }

  if (isUsername && !isPassword) {
    setResponse({ error: true, payload: "Enter username" });
    return;
  }

  if (isPassword && !isUsername) {
    setResponse({ error: true, payload: "Enter paassword" });
    return;
  }

  if (isPasswordLength) {
    setResponse({
      error: true,
      payload: "Enter Password must be at least 8 characters long..",
    });
    return;
  }

  if (isPasswordRegex) {
    setResponse({
      error: true,
      payload:
        "Password must have at least a symbol, upper and lower case letters and a number.password must have at least a symbol, upper and lower case letters and a number.",
    });
    return;
  }

  userLoginService(username, password).then((response) => {
    if (typeof response.payload === "string")
      response.payload = { accessToken: response.payload };
    response.payload.user = username;
    setResponse(response);
  });
};

export default submitHandler;
