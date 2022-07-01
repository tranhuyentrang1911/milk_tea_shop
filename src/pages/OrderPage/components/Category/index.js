import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categorySelector } from "redux/selectors";
import { fetchCategory } from "redux/slices/categorySlice";
import filtersSlice from "redux/slices/filtersSlice";

import styles from "./category.module.scss";

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const categoryList = useSelector(categorySelector);

  const handleCategoryChange = (id) => {
    dispatch(filtersSlice.actions.classifyFilterChange(id));
  };
  return (
    <div>
      <div className={styles.category}>
        {categoryList.map((item) => (
          <div
            key={item.id}
            className={styles.category_item}
            onClick={() => handleCategoryChange(item.id)}
          >
            <div>
              <img
                src={require(`../../../../assets/images/productIcons/${item.img}`)}
                alt={item.name}
              />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
