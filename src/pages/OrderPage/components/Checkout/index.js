import { Input, Radio, Space } from "antd";
import cx from "classnames";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { handlePrice, showSuccess } from "assets/handleManyThings";
import svga from "assets/svg";
import { cartDetailSelector } from "redux/selectors";
import { deleteProductToCart, fetchCart } from "redux/slices/cartSlice";
import { addNewOrder } from "redux/slices/orderSlice";

import styles from "./checkout.module.scss";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phone = JSON.parse(localStorage.getItem("user")).user.phone;
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipCost, setShipCost] = useState(0);
  const [totalOrderPrice, setOrderPrice] = useState(0);
  const [payment, setPayment] = useState("Trực tiếp");
  const [note, setNote] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")).user.id;
  const cartDetail = useSelector(cartDetailSelector);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, []);

  useEffect(() => {
    setTotalPrice(0);

    cartDetail.forEach((item) =>
      setTotalPrice((pre) => {
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

  useEffect(() => {
    if (totalPrice >= 250000) {
      setShipCost(0);
    } else {
      setShipCost(35000);
    }
  }, [totalPrice]);

  useEffect(() => {
    setOrderPrice(totalPrice + shipCost);
  }, [totalPrice, shipCost]);
  const onPaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Vui lòng nhập địa chỉ của bạn!"),
    }),
    onSubmit: (values) => {
      const date = new Date();
      const newOrder = {
        date,
        userId,
        phone,
        price: totalOrderPrice,
        note,
        address: values.address,
        payment,
        status: "Đang giao hàng",
      };
      const cartIdArray = [];
      cartDetail.forEach((item) => {
        if (item.userId === userId) {
          cartIdArray.push(item.id);
        }
      });
      console.log("newOrder", newOrder);
      cartIdArray.forEach((item) => dispatch(deleteProductToCart(item)));
      dispatch(addNewOrder(newOrder));
      showSuccess("Đặt hàng");
      setNote("");
      navigate("/order");
    },
  });

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.left_item}>
          <div style={{ display: "flex" }}>
            {svga.location}

            <h3>Địa chỉ: </h3>
          </div>
          <Input
            className={
              formik.errors.address && formik.touched.address
                ? cx(styles.input, styles.active)
                : styles.input
            }
            name="address"
            placeholder="Nhập địa chỉ của bạn"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.address && formik.touched.address && (
            <small>{formik.errors.address}</small>
          )}
        </div>
        <div className={styles.left_item}>
          <div style={{ display: "flex" }}>
            {" "}
            {svga.phone}
            <h3>Số điện thoại</h3>
          </div>
          <p>{phone}</p>
        </div>
        <div className={styles.left_item}>
          <div style={{ display: "flex" }}>
            {svga.clock}

            <h3>Thời gian nhận hàng</h3>
          </div>
          <div style={{ marginLeft: "30px" }}>
            <strong>Nhận hàng trong: </strong>
            <span>Hôm nay</span>
            <br />
            <strong>Thời gian giao hàng: </strong>
            <span>Càng sớm càng tốt</span>
          </div>
        </div>
        <div className={styles.left_item}>
          <h3>Ghi chú cho cửa hàng</h3>
          <Input
            className={styles.input}
            placeholder="Nhập ghi chú"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.right_item}>
          <h3>Thông tin thanh toán</h3>
          <div className={styles.price_item}>
            <p>Tạm tính: </p>
            <p>{handlePrice(totalPrice)}</p>
          </div>
          <div className={styles.price_item}>
            <p>Phí vận chuyển: </p>
            <p>{handlePrice(shipCost)}</p>
          </div>
          <div className={styles.price_item}>
            <p>Tổng tiền: </p>
            <p>{handlePrice(totalOrderPrice)}</p>
          </div>
        </div>
        <div className={styles.right_item}>
          <h3>Phương thức thanh toán</h3>
          <Radio.Group onChange={onPaymentChange} value={payment}>
            <Space direction="vertical">
              <Radio value="Trực tiếp">Thanh toán khi nhận hàng</Radio>
              <Radio value="Thẻ ngân hàng">Thẻ ngân hàng/Thẻ tín dụng</Radio>
              <Radio value="Ví điện tử">Ví ZaloPay/ Ví Momo</Radio>
            </Space>
          </Radio.Group>
        </div>
        <button type="submit" onClick={formik.handleSubmit}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Checkout;
