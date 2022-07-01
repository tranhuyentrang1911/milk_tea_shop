import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handlePrice, showMessage } from "assets/handleManyThings";
import svga from "assets/svg";
import { cartDetailSelector } from "redux/selectors";
import cartSlice, { deleteProductToCart, fetchCart, updateQuantity } from "redux/slices/cartSlice";

import UpdateOrderProduct from "../UpdateProduct";
import styles from "./cartDetail.module.scss";

const CartDetail = () => {
  const cartDetail = useSelector(cartDetailSelector);
  const dispatch = useDispatch();
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const userId = JSON.parse(localStorage.getItem("user")).user.id;
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  const handleMinusQuantity = (quantity, id) => {
    if (quantity > 1) quantity = quantity - 1;
    dispatch(updateQuantity({ id: id, quantity: quantity }));
  };
  const handleAddQuantity = (quantity, id) => {
    quantity = quantity + 1;
    dispatch(updateQuantity({ id: id, quantity: quantity }));
  };
  const handleCloseOnclick = () => {
    const cartDetail = document.querySelector(`#cartDetail`);
    cartDetail.style.display = "none";
  };
  const handleUpdateOrderProduct = (id) => {
    const updateForm = document.querySelector(`#update-product-${id}`);
    updateForm.style.display = "flex";
  };

  useEffect(() => {
    setTotalCartPrice(0);
    setNumber(cartDetail.length);
    cartDetail.forEach((item) =>
      setTotalCartPrice((pre) => {
        if (item.size === "L") {
          return pre + (item.price + 5000) * item.quantity;
        } else if (item.size === "XL") {
          return pre + (item.price + 10000) * item.quantity;
        } else {
          return pre + item.price * item.quantity;
        }
      })
    );
  }, [cartDetail]);
  //const
  const navigate = useNavigate();
  const handleMovePage = () => {
    if (totalCartPrice > 0) {
      handleCloseOnclick();
      navigate(`/order/checkout`);
    } else {
      showMessage("Bạn chưa chọn sản phẩm nào");
    }
  };
  return (
    <>
      <div
        className={styles.modal}
        id="cartDetail"
        onClick={handleCloseOnclick}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.close}>
            <button onClick={handleCloseOnclick}>{svga.close}</button>
          </div>
          <div className={styles.heading}>Giỏ hàng của bạn ({number} món)</div>
          <div className={styles.main}>
            {number <= 0 && (
              <>
                <div className={styles.sad_icon}>{svga.sadIcon}</div>
                <h2
                  style={{
                    textAlign: "center",
                    color: "green",
                    marginTop: "30px",
                  }}
                >
                  Không có sản phẩm nào
                </h2>
              </>
            )}
            {cartDetail.map((item) => (
              <div className={styles.main_item} key={item.id}>
                <div className={styles.left}>
                  <div className={styles.img}>
                    <img
                      src={require(`assets/images/products/${item.img}`)}
                      alt="Error"
                    />
                  </div>
                  <div className={styles.information}>
                    <div className={styles.name}>{item.name}</div>
                    {item.categoryId === 1 && (
                      <div className={styles.detail}>
                        <span>Kích cỡ: {item.size}, </span>
                        <span>Đường: {item.sugar}, </span>
                        <span>Đá: {item.ice} </span>
                      </div>
                    )}
                    {item.note && (
                      <div>
                        Ghi chú:{" "}
                        {item.note.length >= 20
                          ? item.note.slice(0, 20).concat("...")
                          : item.note}
                      </div>
                    )}
                    <div className={styles.price}>
                      {handlePrice(item.price)}
                    </div>
                  </div>
                </div>
                <div className={styles.action}>
                  <div>
                    <div
                      className={styles.update}
                      onClick={() => handleUpdateOrderProduct(item.id)}
                    >
                      {svga.pencil}
                    </div>
                    <div
                      className={styles.delete}
                      onClick={() =>
                        // dispatch(cartSlice.actions.deleteProductToCart(item.id))
                        dispatch(deleteProductToCart(item.id))
                      }
                    >
                      {svga.bin}
                    </div>
                  </div>
                  <div className={styles.quantity}>
                    <button
                      onClick={() =>
                        handleMinusQuantity(item.quantity, item.id)
                      }
                    >
                      {svga.minus}
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleAddQuantity(item.quantity, item.id)}
                    >
                      {svga.plus}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.clear}></div>

          <div className={styles.bottom}>
            <button onClick={handleMovePage}>
              Thanh toán: {handlePrice(totalCartPrice)}
            </button>
          </div>
        </div>
      </div>
      {cartDetail.map((item) => (
        <UpdateOrderProduct props={item} key={item.id} />
      ))}
      ;
    </>
  );
};

export default CartDetail;
