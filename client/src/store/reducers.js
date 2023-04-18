import user from "./users/user.reducers";
import shopReducer from "./shop/shop.reducers";
const Reducers = {
  user,
  shop: shopReducer,
};
export default Reducers;
