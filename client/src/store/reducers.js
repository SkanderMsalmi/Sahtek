import user from "./users/user.reducers";
import shopReducer from "./shop/shop.reducers";
import cart from "./shop/cartSlice";

const Reducers = {
  user,
  shop: shopReducer,
  cart,
};
export default Reducers;
