import { BackTop } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import svga from "assets/svg";
import Loading from "components/Loading";
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
  const loading = useSelector((state) => state.users.status);

  useEffect(() => {
    const loadingModal = document.getElementById("loading");
    if (loading === "loading") {
      loadingModal.style.display = "flex";
    } else {
      loadingModal.style.display = "none";
    }
  }, [loading]);
  return (
    <>
      <Loading />
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
