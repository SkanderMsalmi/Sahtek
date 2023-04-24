// shopActions.js

export const SET_PRODUCTS = "SET_PRODUCTS";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const EMPTY_WISHLIST = "EMPTY_WISHLIST";

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const addToWishlist = (productId) => ({
  type: ADD_TO_WISHLIST,
  payload: productId,
});

export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});
export const emptyWishlist = () => ({
  type: EMPTY_WISHLIST,
});
