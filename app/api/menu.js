import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const fetchAllSearch = async (searchQuery) => {
  const responce = await client.post("/client-food-search", {
    search: searchQuery,
  });
  return responce;
  // console.log(responce.ok);
};

const fetchAllHome = async () => {
  const responce = await client.post("/client-food-home");
  return responce;
  // console.log(responce.ok);
};

const fetchSingleMenu = async (id) => {
  // console.log(id);
  const responce = await client.post("/client-menu-fetch-single", {
    id: id,
  });
  return responce;
  //console.log(responce.data);
};
export default {
  fetchAllSearch,
  fetchAllHome,
  fetchSingleMenu,
};
