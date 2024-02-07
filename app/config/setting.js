export default {
  // serverUrl: "https://homefood.com.my/backend",
  // apiUrl: "https://homefood.com.my/backend/api",
  // imageUrl: "https://homefood.com.my/backend/vender_images",

  serverUrl:
    "http://192.168.254.2/projects/homefood/backend/homefood-backend/public",
  apiUrl:
    "http://192.168.254.2/projects/homefood/backend/homefood-backend/public/api",
  imageUrl:
    "http://192.168.254.2/projects/homefood/backend/homefood-backend/public/vender_images",

  // serverUrl:
  //   "http://localhost/projects/homefood/backend/homefood-backend/public",
  // apiUrl:
  //   "http://localhost/projects/homefood/backend/homefood-backend/public/api",
  // imageUrl:
  //   "http://localhost/projects/homefood/backend/homefood-backend/public/vender_images",
};
/* Live settings


  serverUrl: "https://homefood.com.my/backend",
  apiUrl: "https://homefood.com.my/backend/api",
  imageUrl: "https://homefood.com.my/backend/vender_images",

  serverUrl: "https://stjobagency.com/",
  apiUrl: "https://stjobagency.com/backend_api/api",
  imageUrl: "https://stjobagency.com/assets/images/",



    serverUrl: "http://localhost/prabhu_jobs/web-app/backend/public",
  apiUrl: "http://localhost/prabhu_jobs/web-app/backend/public/api",
  imageUrl:
    "http://localhost/prabhu_jobs/web-app/backend/public/assets/images/",



*/

/*
import { Constants } from "expo-constants";

const settings = {
  dev: {
    serverUrl: "http://localhost/prabhu_jobs/web-app/backend/public",
    apiUrl: "http://localhost/prabhu_jobs/web-app/backend/public/api",
    imageUrl:
      "http://localhost/prabhu_jobs/web-app/backend/public/assets/images/",
  },
  staging: {
    serverUrl: "https://www.prabhutravel.com/jobmobile/",
    apiUrl: "https://www.prabhutravel.com/jobmobile/api",
    imageUrl: "https://www.prabhutravel.com/jobmobile/assets/images/",
  },
  production: {
    serverUrl: "https://www.prabhutravel.com/jobmobile/",
    apiUrl: "https://www.prabhutravel.com/jobmobile/api",
    imageUrl: "https://www.prabhutravel.com/jobmobile/assets/images/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.menifiest.releaseChannel === "staging") return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
*/
