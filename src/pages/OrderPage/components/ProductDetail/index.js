import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { currentProductSelector } from "redux/selectors";
import { fetchProductItem } from "redux/slices/productSlice";

import CartIcon from "../Cart";
import ProductItem from "../ProductItem";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductItem(params.id));
  }, []);
  const item = useSelector(currentProductSelector);
  console.log("item", item);
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
      <ProductItem item={item} />
    </>
  );
};

export default ProductDetail;
