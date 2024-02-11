import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const fetchMessage = async () => {
  const responce = await client.post("/client-message");
  // console.log(responce.data);
  return responce;
};


const messageReadCount = async () => {
  const responce = await client.post("/client-message-read-count");
  return responce;
  // console.log(responce.ok);
};

const messageReadUpdate = async (id) => {
  // console.log(id);
  const responce = await client.post("/client-message-read-update", {
    id,
  });
  return responce;
  // console.log(responce);
};

export default {
  fetchMessage,
  messageReadCount,
  messageReadUpdate,
  //   fetchAllHome,
  //   fetchSingleMenu,
};
