import gql from "graphql-tag";
import CardProduct from "../../../components/Shop/CardProduct";
import { useEffect, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineClear } from "react-icons/ai";
import SideBarMenu from "../../../components/Shop/Common/SideBarMenu";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectWishlist } from "../../../store/selectors";
import { selectCountAll } from '../../../store/shop/cartSlice';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  addToWishlist,
  emptyWishlist,
  removeFromWishlist,
  setProducts,
} from "../../../store/shop/shop.actions";
import Wishlist from "../../../components/Shop/WishList";
import Slideshow from "../../../components/Shop/SlideShow";
import { increment } from "../../../store/shop/cartSlice";
import { Spinner } from "reactstrap";
import AmazonProd from "../../../components/Shop/AmazonProd";
import styles from "./HomeShop.Module.scss";
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
const GET_AMAZON_PRODUCTS = gql`
query Query {
  getAmazonProducts
}`
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
  const CartNumber = useSelector(selectCountAll);

  const handleWishlistClick = () => {
    setShowWishlist(!showWishlist);
  };
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { loading: loadingAmazon, error: errorAmazon, data: dataAmazon } = useQuery(GET_AMAZON_PRODUCTS);
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
  useEffect(() => {
    if (dataAmazon) {
      console.log(dataAmazon.getAmazonProducts);
    }
  }, [dataAmazon]);
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
    dispatch(increment(product));
  };
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
          <Link className="btn btn-outline-info"
            style={{ textAlign: "right" }} as={NavLink} to="/cart" >Panier ({CartNumber})</Link>

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
        <div className="border-top mb-5" style={{ width: "100vw" }}>
          <h4>See also:</h4>
        </div>
        {loadingAmazon && <Spinner />}

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 3,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={3}
          swipeable
        >
          {JSON.parse(dataAmazon?.getAmazonProducts).map((product, index) => (

            <a href={product.productUrl} target="_blank" > <AmazonProd className={styles.amz} product={product} /></a>
          ))}
        </Carousel>



      </div>
    </>
  );
};

export default HomeShop;
