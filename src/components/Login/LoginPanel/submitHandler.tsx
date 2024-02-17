import { ApiResponse } from "@eco-flow/types";
import { LoignUserInterface } from "./LoignUserInterface";

const submitHandler = (
  _checkStatus: boolean,
  event: React.FormEvent<HTMLFormElement>,
  formValue: LoignUserInterface,
  setResponse: React.Dispatch<React.SetStateAction<ApiResponse>>
) => {
  event.preventDefault();
  let status = true;
  let isUsername = false;
  let isPassword = false;
  let isPasswordLength = false;
  let isPasswordRegex = false;
  const { username, password } = formValue;

  if (username.trim().length === 0) {
    status = false;
    isUsername = true;
  }

  if (password.length === 0) {
    status = false;
    isPassword = true;
  }

  if (password.length < 8) {
    status = false;
    isPasswordLength = true;
  }

  if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
    status = false;
    isPasswordRegex = true;
  }

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
};

export default submitHandler;
