// shopReducers.js

import {
  SET_PRODUCTS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  EMPTY_WISHLIST,
} from "./shop.actions";

const initialState = {
  products: [],
  wishlist: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_TO_WISHLIST: {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && !state.wishlist.includes(product)) {
        return {
          ...state,
          wishlist: [...state.wishlist, product],
        };
      }
      return state;
    }
    case REMOVE_FROM_WISHLIST: {
      const productId = action.payload;
      const productIndex = state.wishlist.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const newWishlist = [...state.wishlist];
        newWishlist.splice(productIndex, 1);
        return {
          ...state,
          wishlist: newWishlist,
        };
      }
      return state;
    }
    case EMPTY_WISHLIST: {
      return {
        ...state,
        wishlist: [],
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
