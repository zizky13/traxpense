import { createContext, useReducer } from "react";
import { GlobalStyles } from "../constants/GlobalStyles";

const DUMMY_EXPENSES = [
  { userId: "1"},
  {
    categories: [
      "Food",
      "Personal",
      "Transportation",
      "Home",
      "Utilities",
      "Travel",
      "Health/medical	",
      "Pets",
      "Gifts",
      "Debt",
      "Loan",
      "Others",
    ],
    categoriesColor: [
      GlobalStyles.colors.primary100,
      GlobalStyles.colors.primary100,
      GlobalStyles.colors.primary200,
      GlobalStyles.colors.primary200,
      GlobalStyles.colors.primary300,
      GlobalStyles.colors.primary300,
      GlobalStyles.colors.accent300,
      GlobalStyles.colors.accent300,
      GlobalStyles.colors.accent200,
      GlobalStyles.colors.accent200,
      GlobalStyles.colors.accent100,
      GlobalStyles.colors.accent100,
    ],
  },
  {
    incomes: ["Savings", "Paycheck", "Bonus", "Interest"],
    incomesColor: [
      GlobalStyles.colors.accent200,
      GlobalStyles.colors.accent200,
      GlobalStyles.colors.primary200,
      GlobalStyles.colors.primary200,
    ],
  },
];

export const ExpenseContext = createContext({
  balance: 0, //db
  categories: [], //local
  categoriesColor: [], //local
  incomes: [], //local
  incomesColor: [], //local
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return ;
    case "EDIT":
      return;
    case "DELETE":
      return;
    default:
      return state;
  }
};

export default ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const editExpense = (id, expenseData) => {
    dispatch({ type: "EDIT", payload: { id: id, data: expenseData } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expenses,
    userId: expenses.userId,
    categories: expenses[1].categories,
    categoriesColor: expenses[1].categoriesColor,
    incomes: expenses[2].income,
    incomesColor: expenses[2].incomeColor,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
