import { Dispatch, SetStateAction } from "react";
import validateDatabaseCoonnectionService from "../../service/setup/validateDatabaseCoonnection.service";
import { ISetupValues } from "./SetupValues.interfaace";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const validator = (
  step: number,
  value: ISetupValues,
  setError: Dispatch<
    SetStateAction<{
      errorHeader?: string | undefined;
      errorMessage?: string | undefined;
    }>
  >,
  stepChange: (nextStep: number) => void,
  databaseValidating: Dispatch<SetStateAction<boolean>>
) => {
  const next = () => stepChange(step + 1);
  switch (step) {
    case 0:
      next();
      break;

    case 1:
      if (
        value.projectType === "blank" ||
        value.projectType === "import" ||
        value.projectType === "template"
      )
        next();
      break;

    case 2:
      if (value.projectType === "blank") {
        if (value.userInfo.name.trim().length === 0) {
          setError({
            errorHeader: "Empty Name",
            errorMessage: "Please enter a valid name.",
          });
          return;
        }

        if (value.userInfo.username.trim().length === 0) {
          setError({
            errorHeader: "Empty Username",
            errorMessage: "Please enter a valid username.",
          });
          return;
        }

        if (value.userInfo.username.trim().length < 5) {
          setError({
            errorHeader: "Invalid Username",
            errorMessage:
              "Please enter a username with minimum of 5 charecters.",
          });
          return;
        }

        if (value.userInfo.password.length === 0) {
          setError({
            errorHeader: "Empty Password",
            errorMessage: "Please enter a valid password.",
          });
          return;
        }

        if (value.userInfo.password.length < 8) {
          setError({
            errorHeader: "Invalid Password",
            errorMessage: "Password must be at least 8 characters long..",
          });
          return;
        }

        if (
          !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
            value.userInfo.password
          )
        ) {
          setError({
            errorHeader: "Invalid Password",
            errorMessage:
              "password must have at least a symbol, upper and lower case letters and a number.",
          });
          return;
        }

        if (
          value.userInfo.email.trim().length > 0 &&
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value.userInfo.email.trim()
          )
        ) {
          setError({
            errorHeader: "Invalid Email",
            errorMessage: "Enter a valid email address.",
          });
          return;
        }

        setError({});
        next();
      }

      if (value.projectType === "import") {
        if (value.importFile === null || value.importFile.length === 0) {
          setError({
            errorHeader: "Invalid import file",
            errorMessage:
              "Enter a valid import file from the project to be imported.",
          });
          return;
        }
        setError({});
        next();
      }

      if (value.projectType === "template") {
        if (value.templateURL.trim().length === 0) {
          setError({
            errorHeader: "Invalid Template URl",
            errorMessage: "Enter a template url to import.",
          });
          return;
        }

        if (!isValidUrl(value.templateURL.trim())) {
          setError({
            errorHeader: "Invalid Template URl",
            errorMessage: "Enter a valid url to import template from.",
          });
          return;
        }

        setError({});
        next();
      }
      break;

    case 3:
      if (value.projectType === "blank") {
        if (!value.database.useDefault) {
          databaseValidating(true);
          validateDatabaseCoonnectionService(value.database).then((val) => {
            databaseValidating(false);
            if (val.error)
              setError({
                errorHeader: "Invalid Database Connection Details",
                errorMessage: val.payload,
              });
            if (val.success) {
              setError({});
              next();
            }
          });
        } else next();
      } else return;
      break;
  }
};

export default validator;
