import { createContext, useReducer } from "react";
import { GlobalStyles } from "../constants/GlobalStyles";

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
  },
  {
    id: "e1",
    description: "Toilet Paper",
    amount: 94.12,
    time: new Date(2024, 7, 14),
    category: "Utilities",
  },
  {
    id: "e2",
    description: "New TV",
    amount: 799.49,
    time: new Date(2024, 2, 12),
    category: "Personal",
  },
  {
    id: "e3",
    description: "Car Insurance",
    amount: 294.67,
    time: new Date(2024, 2, 28),
    category: "Utilities",
  },
  {
    id: "e4",
    description: "New Desk (Wooden)",
    amount: 450,
    time: new Date(2024, 5, 12),
    category: "Home",
  },
  {
    id: "e5",
    description: "New Desk (Wooden)",
    amount: 450,
    time: new Date(2024, 5, 12),
    category: "Home",
  },
  {
    id: "e6",
    description: "Toilet Paper",
    amount: 94.12,
    time: new Date(2024, 7, 14),
    category: "Utilities",
  },
  {
    id: "e7",
    description: "New TV",
    amount: 799.49,
    time: new Date(2024, 2, 12),
    category: "Personal",
  },
  {
    id: "e8",
    description: "Car Insurance",
    amount: 294.67,
    time: new Date(2024, 2, 28),
    category: "Utilities",
  },
  {
    id: "e9",
    description: "New Desk (Wooden)",
    amount: 450,
    time: new Date(2024, 5, 12),
    category: "Furniture",
  },
  {
    id: "e11",
    description: "Tahu Bakso",
    amount: 500000,
    time: new Date(2024, 5, 12),
    category: "Food",
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  balance: 0,
  categories: [],
  categoriesColor: [],
  incomes: [],
  incomesColor: [],
  addBalance: (amount) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  editExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BALANCE":
      return { ...state, balance: state.balance + action.payload };
    case "ADD":
      const newId = Math.random().toString();
      return {
        ...state,
        expenses: [...state.expenses, { id: newId, ...action.payload }],
      };
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

  const value = {
    expenses: expenses,
    balance: expenses[0].balance,
    categories: expenses[1].categories,
    categoriesColor: expenses[1].categoriesColor,
    incomes: expenses[2].income,
    incomesColor: expenses[2].incomeColor,
    addExpense,
    deleteExpense,
    editExpense,
    addBalance,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
