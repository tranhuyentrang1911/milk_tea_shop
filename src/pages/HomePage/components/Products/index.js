import React, { useEffect } from "react";

import { scrollToTop } from "assets/handleManyThings";
import Slider from "pages/HomePage/layouts/Slider";

import Filters from "../Filters";
import ProductList from "../ProductList";

const Products = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <Slider />
      <div style={{ margin: "auto", width: "80%" }}>
        <Filters />
        <ProductList />
      </div>
    </>
  );
};

export default Products;
