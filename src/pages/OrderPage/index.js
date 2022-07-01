import { BackTop } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

import svga from "assets/svg";
import NotFound from "components/NotFound";

import styles from "../../common/backTop.module.scss";
import CartDetail from "./components/CartDetail";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";
import Search from "./components/Search";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

const OrderPage = () => {
  return (
    <>
      <Header />
      <BackTop>
        <div className={styles.back_top}>{svga.up}</div>
      </BackTop>

      <Routes>
        <Route index element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search/:nameFilter" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CartDetail />
      <Footer />
    </>
  );
};

export default OrderPage;
