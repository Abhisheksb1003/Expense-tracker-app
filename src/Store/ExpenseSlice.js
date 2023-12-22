import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: [],
};

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    saveExpense(state, action) {
      state.store = [action.payload];
    },
    deleteExpense(state, action) {
      // Use filter to remove the expense with the specified ID
      state.store = state.store.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const expenseAction = ExpenseSlice.actions;
export default ExpenseSlice.reducer;