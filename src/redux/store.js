import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "redux/slices/cartSlice";
import categorySlice from "redux/slices/categorySlice";
import filtersSlice from "redux/slices/filtersSlice";
import orderSlice from "redux/slices/orderSlice";
import productSlice from "redux/slices/productSlice";
import promotionSlice from "redux/slices/promotionSlice";
import usersSlice from "redux/slices/usersSlice";

const store = configureStore({
  reducer: {
    productList: productSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
    promotion: promotionSlice.reducer,
    category: categorySlice.reducer,
    users: usersSlice.reducer,
    order: orderSlice.reducer,
  },
});

// import { createStore } from "redux";
// import rootReducer from "./reducer";
// import { composeWithDevTools } from "redux-devtools-extension";
// const composedEnhancers = composeWithDevTools();
// const store = createStore(rootReducer, composedEnhancers);
export default store;
