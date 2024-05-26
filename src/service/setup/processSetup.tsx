import { ApiResponse } from "@ecoflow/types";
import { ISetupValues } from "../../pages/SetupPage/SetupValues.interface";
import axios from "../../utils/axios/axios";

const processSetup = async (values: ISetupValues): Promise<ApiResponse> => {
  if (values.projectType === "import") {
    const formData = new FormData();
    formData.append("importFile", values.importFile![0]);

    const upload: ApiResponse = (
      await axios.post("setup/import", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
    ).data;

    console.log(upload);

    return upload;
  }

  if (values.projectType === "blank") {
    const setupBlank = {
      userInfo: values.userInfo,
      databaseInfo: values.database,
    };
    return (await axios.post("setup/blank", setupBlank)).data;
  }

  //TODO:Create project from template

  return {};
};

export default processSetup;
