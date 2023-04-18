import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../store/shop/shop.actions";
import { selectWishlist } from "../../store/selectors";
import "./Wishlist.css";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
const WishlistCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <div className="card mb-3 col-md-6">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img src={product.image} className="card-img" alt={product.name} />
        </div>
        <div className="col-md-9 d-flex justify-content-center align-items-center">
          <div className="card-body d-flex justify-content-between align-items-center">
            <h5 className="card-title m-4">{product.name}</h5>
            <div className="card-text d-flex">
              <button
                className="btn btn-primary m-2"
                onClick={() => alert("Added to cart")}
              >
                <FaShoppingCart />
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={handleRemoveFromWishlist}
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const wishlist = useSelector(selectWishlist);

  return (
    <div className="wishlist w-100">
      <h3 className="mb-3">Wishlist</h3>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlist.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
