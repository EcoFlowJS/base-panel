import { DB_Config } from "../../components/Steps/Database/DB_DriverList";
import defaultUsers from "../../components/Steps/UserCreation/defaultDetails";

interface ISetupValues {
  projectType: string;
  importFile: FileList | null;
  templateURL: string;
  userInfo: typeof defaultUsers;
  database: typeof DB_Config;
}

export type { ISetupValues };
