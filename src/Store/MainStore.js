import { configureStore } from "@reduxjs/toolkit";
import Authreducers from "../Store/Authslice";
import Expensereducer from "../Store/ExpenseSlice";
import Themereducer from "../Store/ThemeSlice";

const store = configureStore({
  reducer: { auth: Authreducers, expense: Expensereducer, theme: Themereducer },
});

export default store;