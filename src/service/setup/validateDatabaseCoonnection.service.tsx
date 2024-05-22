import { ApiResponse } from "@ecoflow/types";
import { ISetupValues } from "../../pages/SetupPage/SetupValues.interface";
import axios from "../../utils/axios/axios";

const validateDatabaseCoonnectionService = async (
  connection: ISetupValues["database"]
): Promise<ApiResponse> => {
  const databaseConnection: ISetupValues["database"] = { ...connection };
  if (databaseConnection.envMongoConnectionString)
    databaseConnection.databaseConfigurationConnectionString = `env(${databaseConnection.databaseConfigurationConnectionString})`;

  if (databaseConnection.envUsername)
    databaseConnection.databaseConfigurationUser = `env(${databaseConnection.databaseConfigurationUser})`;

  if (databaseConnection.envPassword)
    databaseConnection.databaseConfigurationPassword = `env(${databaseConnection.databaseConfigurationPassword})`;

  if (databaseConnection.envDatabase)
    databaseConnection.databaseConfigurationDatabase = `env(${databaseConnection.databaseConfigurationDatabase})`;

  return (await axios.post("/setup/blank/validateDB", databaseConnection)).data;
};

export default validateDatabaseCoonnectionService;
