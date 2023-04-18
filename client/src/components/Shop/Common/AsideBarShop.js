import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const AsideBarShop = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const para = useRef(null);
  const [catPath, setCatPath] = useState("all categories");
  const categories = [
    "smartphone",
    "laptop",
    "smartwatch",
    "earbuds",
    "Keyboard",
    "graphics card",
  ];
  return (
    <div className="container mx-auto pb-20">
      <h2 className="text-center text-3xl py-10">All Products</h2>
      <div className="flex justify-between gap-10">
        <div className="w-[20%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className="select-none cursor-pointer flex justify-between"
            onClick={() => {
              setFilterProducts(products);
              setCatPath("all categories");
            }}
          >
            <span className="font-semibold">All Categories</span>
            <span>{`(${products.length})`}</span>
          </h3>
          {categories.map((cat, i) => (
            <p
              ref={para}
              className="select-none cursor-pointer capitalize font-semibold"
              key={i}
              onClick={() => {
                const filters = products.filter(
                  (product) => product.category === cat
                );
                setFilterProducts(filters);
                setCatPath(categories[i]);
              }}
            >
              <span>{cat}</span>
            </p>
          ))}
        </div>
        <div>
          <p className="text-gray-500 pb-4">
            {<Link to="/">Home </Link>}/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AsideBarShop;
