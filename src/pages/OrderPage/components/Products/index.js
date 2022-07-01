import React from "react";
import { useEffect } from "react";

import Slider from "pages/HomePage/layouts/Slider";

import CartIcon from "../Cart";
import Category from "../Category";
import ProductList from "../ProductList";

const Products = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <CartIcon />
      <div style={{ marginTop: "76px" }}></div>
      <Slider />
      <Category />
      <ProductList />
    </>
  );
};

export default Products;
