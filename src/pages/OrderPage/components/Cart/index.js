import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import svga from "assets/svg";
import { cartDetailSelector } from "redux/selectors";

const Cart = styled.div`
  width: 50px;
  height: 50px;
  background-color: #0c713d;
  position: fixed;
  right: 40px;
  bottom: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border: 1px solid #fff;
`;
const Index = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  border: 1px solid #aaa;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: red;
  right: -4%;
  top: -4%;
  border-radius: 50%;
`;

const CartIcon = () => {
  const [number, setNumber] = useState(0);
  const cartDetail = useSelector(cartDetailSelector);

  useEffect(() => {
    setNumber(cartDetail.length);
  }, [cartDetail]);

  const handleOnclick = () => {
    const cartDetail = document.querySelector(`#cartDetail`);
    cartDetail.style.display = "flex";
  };
  return (
    <div>
      <Cart onClick={handleOnclick}>
        {number > 0 && <Index style={{ textAlign: "center" }}> {number}</Index>}
        <div
          style={{
            width: "60%",
            height: "60%",
            fill: "#fff",
          }}
        >
          {svga.cart}
        </div>
      </Cart>
    </div>
  );
};

export default CartIcon;
