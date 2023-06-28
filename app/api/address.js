import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const storeAddress = async (address, street, city_name, state, postal_code) => {
  const responce = await client.post("/client-address-store", {
    address,
    street,
    city_name,
    state: state.title,
    postal_code,
  });
  return responce;
  // console.log(state);
};

const editAddress = async (
  id,
  address,
  street,
  city_name,
  state,
  postal_code
) => {
  const responce = await client.post("/client-address-edit", {
    id,
    address,
    street,
    city_name,
    state: state.title,
    postal_code,
  });
  return responce;
  // console.log(responce.ok);
};

const deleteAddress = async (id) => {
  // console.log(id);
  const responce = await client.post("/client-address-delete", {
    id: id,
  });
  return responce;
  //console.log(responce.data);
};
const setDefaultAddress = async (id) => {
  // console.log(id);
  const responce = await client.post("/client-address-setdefault", {
    id: id,
  });
  return responce;
  //console.log(responce.data);
};

export default {
  storeAddress,
  editAddress,
  deleteAddress,
  setDefaultAddress,
};
