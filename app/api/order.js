import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const storeOrders = async (cart, payment_options, delivery_address) => {
  const result = await client.post("/client-order-store", {
    orders: cart,
    payment_options: payment_options.id,
    delivery_address: delivery_address.id,
  });
  // console.log(cart);
  return result;
};

const pendingOrders = async (radius) => {
  const result = await client.post("/client-order-pending", { radius });
  // console.log(result);
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
