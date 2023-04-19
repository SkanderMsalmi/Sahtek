import gql from "graphql-tag";
import CardProduct from "../../../components/Shop/CardProduct";
import { useEffect, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineClear } from "react-icons/ai";
import SideBarMenu from "../../../components/Shop/Common/SideBarMenu";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectWishlist } from "../../../store/selectors";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  addToWishlist,
  emptyWishlist,
  removeFromWishlist,
  setProducts,
} from "../../../store/shop/shop.actions";
import Wishlist from "../../../components/Shop/WishList";
import Slideshow from "../../../components/Shop/SlideShow";
import { increment } from "../../../store/shop/cartSlice";

const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      category
      description
      name
      price
      stock
      image
    }
  }
`;
const GET_CATEGORIES = gql`
  query Query {
    getCategories
  }
`;
const HomeShop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const wishlist = useSelector(selectWishlist);
  const [showWishlist, setShowWishlist] = useState(false);

  const handleWishlistClick = () => {
    setShowWishlist(!showWishlist);
  };
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [categories, setCategories] = useState([]);
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.getAllProducts));
    }
    if (dataCategories) {
      setCategories(dataCategories.getCategories);
    }
  }, [data, dispatch, dataCategories, categories]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const filteredProducts = products.filter(
    (product) =>
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      (maxPrice === "" || product.price < parseInt(maxPrice))
  );
  function addToCart(product) {
    dispatch (increment(product));
  }
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const isWishlist = (productId) => {
    return wishlist.some((product) => product.id === productId);
  };
  const onToggleWishlist = (productId) => {
    if (isWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };
  const clearWishlist = () => {
    dispatch(emptyWishlist());
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };
  const handleChoosePriceeChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <Slideshow />
      <div className="d-flex justify-content-end">
        <div className="m-2">
          {" "}
          <button
            onClick={toggleSidebar}
            className="btn btn-outline-danger"
            style={{ textAlign: "right" }}
          >
            Filter <GiSettingsKnobs />{" "}
          </button>
        </div>

        <div className="m-2">
          {" "}
          <button
            onClick={clearWishlist}
            className="btn btn-outline-info"
            style={{ textAlign: "right" }}
          >
            Clear Wishlist <AiOutlineClear />
          </button>
          <button
            onClick={handleWishlistClick}
            className="btn btn-outline-info"
            style={{ textAlign: "right" }}
          >
            Wishlist
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <SideBarMenu
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onCategoryChange={handleCheckboxChange}
          onPriceChange={handleChoosePriceeChange}
          selectedCategories={selectedCategories}
          categories={categories}
          maxPrice={maxPrice}
        />
      )}
      <div className="row mt-4">
        {showWishlist && <Wishlist />}

        {filteredProducts?.map((product, index) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <CardProduct
              key={index}
              product={product}
              addToCart={addToCart}
              isWishlist={isWishlist(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="  w-100 text-center">
            <img
              src="https://kalpamritmarketing.com/design_img/no-product-found.jpg"
              alt="no found"
              srcset=""
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeShop;
