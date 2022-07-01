import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categorySelector } from "redux/selectors";
import { fetchCategory } from "redux/slices/categorySlice";
import filtersSlice from "redux/slices/filtersSlice";

import styles from "./filters.module.scss";

const Filters = () => {
  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState("");
  const categoryList = useSelector(categorySelector);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const options = categoryList.map((item) =>
    Object.assign({}, { value: item.id, label: item.name })
  );

  const handleClassifyChange = (value) => {
    dispatch(filtersSlice.actions.classifyFilterChange(value));
  };
  const handlePriceChange = (value) => {
    dispatch(filtersSlice.actions.priceFilterChange(value));
  };
  const handleNameChange = (e) => {
    setFilterName(e.target.value);
    dispatch(filtersSlice.actions.nameFilterChange(e.target.value));
  };
  return (
    <div className={styles.filters}>
      <div className={styles.filter_item}>
        <label htmlFor="phanloai">Chọn theo phân loại</label>
        <Select
          className={styles.select}
          name="phanloai"
          id="phanloai"
          defaultValue={0}
          onChange={handleClassifyChange}
          options={[{ value: 0, label: "Không lựa chọn" }, ...options]}
        />
      </div>
      <div className={styles.filter_item}>
        <label htmlFor="gia">Chọn theo giá</label>
        <Select
          className={styles.select}
          name="gia"
          id="gia"
          defaultValue="Không lựa chọn"
          onChange={handlePriceChange}
        >
          <Select.Option value="Không lựa chọn">Không lựa chọn</Select.Option>
          <Select.Option value="Từ thấp đến cao">Từ thấp đến cao</Select.Option>
          <Select.Option value="Từ cao đến thấp">Từ cao đến thấp</Select.Option>
        </Select>
      </div>
      <div className={styles.filter_item}>
        <label htmlFor="search">Chọn theo tên</label>
        <Input
          type="seacrh"
          name="search"
          id="search"
          placeholder="Nhập tên sản phẩm"
          value={filterName}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
};

export default Filters;
