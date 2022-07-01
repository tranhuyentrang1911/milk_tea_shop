import { BackTop } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

import svga from "assets/svg";
import NotFound from "components/NotFound";

import styles from "../../common/backTop.module.scss";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Products from "./components/Products";
import Promotion from "./components/Promotion";
import SignIn from "./components/SignIn_SignUp/SignIn";
import SignUp from "./components/SignIn_SignUp/SignUp";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

const HomePage = () => {
  return (
    <>
      <SignUp />
      <SignIn />
      <BackTop>
        <div className={styles.back_top}>{svga.up}</div>
      </BackTop>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default HomePage;
