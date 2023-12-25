import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const storeOrders = async (userID, formData, payMethod, deliveryAddress) => {
  const result = await client.post("/client-order-store", {
    user_id: userID,
    orders: formData,
    payment_options: payMethod,
    delivery_address: deliveryAddress,
  });
  // console.log(cart);
  return result;
};

const pendingOrders = async () => {
  const result = await client.post("/client-order-pending");
  //console.log(result.data);
  return result;
};

const orderHistory = async () => {
  const result = await client.post("/client-order-histroy");
  // console.log(result);
  return result;
};

export default {
  storeOrders,
  pendingOrders,
  orderHistory,
};
