import { configureStore } from "@reduxjs/toolkit";
import Authreducers from "../Store/Authslice";
import Expensereducer from "../Store/ExpenseSlice";

const store = configureStore({
  reducer: { auth: Authreducers, expense: Expensereducer },
});

export default store;