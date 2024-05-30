import userLoginService from "../../service/user/userLogin.service";

const submitHandler = async (
  formValue: Record<"username" | "password", string>
): Promise<{
  accessToken: string;
  user: string;
}> => {
  const { username, password } = formValue;
  const isUsername = username.trim().length === 0 ? true : false;
  const isPassword = password.length === 0 ? true : false;
  const isPasswordLength = password.length < 8 ? true : false;
  const isPasswordRegex =
    !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
      ? true
      : false;

  if (isUsername && isPassword) throw "Enter username and password.";

  if (isUsername && !isPassword) throw "Enter username";

  if (isPassword && !isUsername) throw "Enter password";

  if (isPasswordLength)
    throw "Enter Password must be at least 8 characters long...";

  if (isPasswordRegex)
    throw "Password must have at least a symbol, upper and lower case letters and a number.password must have at least a symbol, upper and lower case letters and a number.";

  const { error, success, payload } = await userLoginService(
    username,
    password
  );
  if (error) throw payload;
  if (success) return { accessToken: payload, user: username };

  throw "Error while authenticating";
};

export default submitHandler;
