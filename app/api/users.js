import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const register = async () => {
  /*
    //console.log(userInfo);
    const data = new FormData();
    data.append("name", userInfo.name);
    data.append("role", 1);
    data.append("email", userInfo.email);
    data.append("password", userInfo.password);
    data.append("password", userInfo.password);
    data.append("password_confirmation", userInfo.password_confirmation);
    data.append("status", 1);
  
  
    const result = await client.post("/register", data);
   // console.log(result);
    return result;
    */
};

const userProfileUpdate = async (first_name, last_name, email) => {
  const result = await client.post("/client-profile-update", {
    first_name,
    last_name,
    email,
  });
  //console.log(result.data);
  return result;
};

const userPasswordChange = async (password, confirm_password) => {
  const result = await client.post("/client-change-password", {
    password: password,
    c_password: confirm_password,
  });
  // console.log(result);
  return result;
};

const userSetRadius = async (radius) => {
  const result = await client.post("/client-set-search-radius", { radius });
  // console.log(result);
  return result;
};

const userRefresh = async () => {
  const result = await client.post("/profile-info");
  // console.log(result);
  return result;
};

export default {
  register,
  userRefresh,
  userProfileUpdate,
  userPasswordChange,
  userSetRadius,
};

