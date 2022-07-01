import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handlePrice } from "assets/handleManyThings";
import svga from "assets/svg";
import { productListRemainingSelector } from "redux/selectors";
import { fetchProductList } from "redux/slices/productSlice";

import OrderProduct from "../OrderProduct";
import styles from "./productList.module.scss";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(productListRemainingSelector);

  useEffect(() => {
    dispatch(fetchProductList());
  }, []);

  const handleOrderProduct = (id) => {
    const orderForm = document.querySelector(`#order-product-${id}`);
    orderForm.style.display = "flex";
  };

  const handleToProductDetailPage = (id) => {
    navigate(`/order/products/${id}`, {
      state: {
        id,
      },
    });
  };
  return (
    <>
      <h1 className={styles.heading}>Sản phẩm nổi bật</h1>
      <p className={styles.content}>
        Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà
        phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm
        giá trị nhất khi thưởng thức.
      </p>
      <div className={styles.main}>
        {productList.map((item) => (
          <div key={item.id} className={styles.main_item}>
            <div
              className={styles.img}
              onClick={() => handleToProductDetailPage(item.id)}
            >
              <img
                src={require(`../../../../assets/images/products/${item.img}`)}
                alt={item.name}
              />
            </div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.price}>{handlePrice(item.price)}</p>
            <button onClick={() => handleOrderProduct(item.id)}>
              {svga.cart}Đặt mua
            </button>
          </div>
        ))}
        {productList.map((product) => (
          <OrderProduct
            key={product.id}
            id={product.id}
            img={product.img}
            categoryId={product.categoryId}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
