import { ApiResponse } from "@eco-flow/types";
import { ISetupValues } from "../../pages/SetupPage/SetupValues.interfaace";
import axios from "../../utils/axios/axios";

const processSetup = async (values: ISetupValues): Promise<ApiResponse> => {
  if (values.projectType === "import") {
    const formData = new FormData();
    formData.append("importFile", values.importFile![0]);
    formData.append("importFileName", values.importFile![0].name);

    const upload: ApiResponse = (
      await axios.post("setup/import", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
    ).data;

    if (upload.error) return upload;

    const res: ApiResponse = (
      await axios.patch("setup/import", {
        newFileName: upload.payload.newFileName,
      })
    ).data;

    return {
      ...res,
      payload: [upload.payload.msg, res.payload],
    };
  }

  if (values.projectType === "blank") {
    const setupBlank = {
      userInfo: values.userInfo,
      databaseInfo: values.database,
    };
    console.log((await axios.post("setup/blank", setupBlank)).data);
  }

  return {};
};

export default processSetup;
