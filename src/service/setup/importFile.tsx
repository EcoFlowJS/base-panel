import axios from "../../utils/axios/axios";

const ImportFile = async (data: FileList | null) => {
  const formData = new FormData();
  const file = data![0];
  formData.append("file", file);
  formData.append("fileName", file.name);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  console.log(formData);

  axios.post("setup/import", formData, config).then((response) => {
    console.log(response.data);
  });
};

export default ImportFile;
