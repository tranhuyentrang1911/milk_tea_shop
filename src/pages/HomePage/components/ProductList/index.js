import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productListRemainingSelector } from "redux/selectors";
import { fetchProductList } from "redux/slices/productSlice";

import ProductItem from "./ProductItem";
import styles from "./productList.module.scss";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(productListRemainingSelector);
  useEffect(() => {
    dispatch(fetchProductList());
  }, []);

  if (productList.length === 0) {
    return (
      <div className={styles.main}>
        <h3>Không tìm thấy sản phẩm nào</h3>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.main}>
          {productList.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </>
    );
  }
};

export default ProductList;
