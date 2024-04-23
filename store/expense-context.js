import { createContext, useReducer } from "react";
import { GlobalStyles } from "../constants/GlobalStyles";
import { db } from "../firebase";
import { push, ref } from "firebase/database";
import { set } from "firebase/database";

const DUMMY_EXPENSES = [
  { balance: 1480000 },
  {
    categories: [
      "Food",
      "Gifts",
      "Health/medical	",
      "Home",
      "Transportation",
      "Personal",
      "Pets",
      "Utilities",
      "Travel",
      "Debt",
      "Loan",
      "Others",
      "By Date",
    ],
    categoriesColor: [
      GlobalStyles.colors.primary500,
      GlobalStyles.colors.neutral600,
      GlobalStyles.colors.accent500,
      GlobalStyles.colors.primary400,
      GlobalStyles.colors.neutral500,
      GlobalStyles.colors.accent400,
      GlobalStyles.colors.primary300,
      GlobalStyles.colors.neutral400,
      GlobalStyles.colors.accent300,
      GlobalStyles.colors.primary200,
      GlobalStyles.colors.neutral300,
      GlobalStyles.colors.accent200,
      GlobalStyles.colors.neutral600,
    ],
  },
  {
    incomes: ["Savings", "Paycheck", "Bonus", "Interest"],
    incomesColor: [
      GlobalStyles.colors.neutral400,
      GlobalStyles.colors.accent300,
      GlobalStyles.colors.primary200,
      GlobalStyles.colors.neutral300,
      GlobalStyles.colors.accent200,
    ],
  }
];

export const ExpenseContext = createContext({
  expenses: [], //db
  balance: 0, //db
  categories: [], //local
  categoriesColor: [], //local
  incomes: [], //local
  incomesColor: [], //local
  userId: "", //local
  saveUserId: (userId) => {},
  addBalance: (amount) => {},
  addExpense: ({ description, amount, time, category }) => {},
  deleteExpense: (id) => {},
  editExpense: (id, { description, amount, date }) => {},
});

const writeUserId = (userId) => {
  userId = userId;
};

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BALANCE":
      return { ...state, balance: state.balance + action.payload };
    case "ADD":
      // addNewExpensetoDb(state.userId, action.payload);
      return;
      // return {
      //   ...state,
      //   expenses: [...state.expenses, { id: newId, ...action.payload }],
      // };
    case "EDIT":
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpense = {
        ...state.expenses[expenseIndex],
        ...action.payload.data,
      };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[expenseIndex] = updatedExpense;
      return { ...state, expenses: updatedExpenses };
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case 'SAVE_USER_ID':
      writeUserId(action.payload);
      return { ...state, userId: action.payload };
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

  const addBalance = (amount) => {
    dispatch({ type: "ADD_BALANCE", payload: amount });
  };

  const saveUserId = (userId) => {
    dispatch({ type: "SAVE_USER_ID", payload: userId });
  }

  const value = {
    expenses: expenses,
    userId: expenses.userId,
    balance: expenses[0].balance,
    categories: expenses[1].categories,
    categoriesColor: expenses[1].categoriesColor,
    incomes: expenses[2].income,
    incomesColor: expenses[2].incomeColor,
    addExpense,
    deleteExpense,
    editExpense,
    addBalance,
    saveUserId,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
