import { DB_Config } from "../../components/Steps/Database/DB_DriverList";
import defaultUsers from "../../components/Steps/UserCreation/defaultDetails";
import { ISetupValues } from "./SetupValues.interface";

const defaultValues: ISetupValues = {
  projectType: "blank",
  importFile: null,
  templateURL: "",
  userInfo: defaultUsers,
  database: DB_Config,
};

export default defaultValues;
