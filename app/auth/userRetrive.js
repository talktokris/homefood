import { create } from "apisauce";
import settings from "../config/setting";

const userRetrive = async (authToken) => {
  const apiClient = create({
    // baseURL: "http://192.168.254.4:9000/api",
    baseURL: settings.apiUrl,
  });

  apiClient.addAsyncRequestTransform(async (request) => {
    request.headers["Authorization"] = "Bearer " + authToken;
  });
  const responce = await apiClient.post("/profile-info");

  // if (responce.status == 401) return;
  // console.log(responce.status);
  return responce;
};

export default userRetrive;
