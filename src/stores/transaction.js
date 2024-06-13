import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const state = reactive({
    income: [],
    expense: [],
    total: [],
    totalIncome: 0,
    totalExpense: 0,
  });

  async function fetchTransactions() {
    try {
      const incomeRes = await axios.get('http://localhost:3000/income');
      const expenseRes = await axios.get('http://localhost:3000/expense');
      state.income = incomeRes.data;
      state.expense = expenseRes.data;

      state.total = [
        ...incomeRes.data.map((item) => ({
          ...item,
          type: 'income',
        })),
        ...expenseRes.data.map((item) => ({
          ...item,
          type: 'expense',
        })),
      ];

      state.total = state.total.sort((a, b) => {
        const aTime = new Date(a.date.slice(0, 10)).getTime();
        const bTime = new Date(b.date.slice(0, 10)).getTime();
        return bTime - aTime;
      });

      state.totalIncome = state.income.reduce(
        (acc, cur) => (acc += parseInt(cur.amount)),
        0
      );
      state.totalExpense = state.expense.reduce(
        (acc, cur) => (acc += parseInt(cur.amount)),
        0
      );

      console.log(totalIncome.value);
    } catch (error) {
      alert('데이터 통신 오류 발생');
      console.error(error);
    }
  }
  fetchTransactions();

  const account = computed(() => [...state.income, ...state.expense]);

  const totalBalance = computed(() => state.totalIncome - state.totalExpense);

  const getTransactionsForMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return state.total.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });
  };

  const getIncomeForMonth = (date) => {
    return getTransactionsForMonth(date)
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
  };

  const getExpensesForMonth = (date) => {
    return getTransactionsForMonth(date)
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
  };

  const getTotalBalanceForMonth = (date) => {
    return getIncomeForMonth(date) + getExpensesForMonth(date);
  };

  async function addIncomeTransaction(transaction) {
    try {
      const addResponse = await axios.post(
        'http://localhost:3000/income',
        transaction
      );

      if (addResponse.status !== 201) return alert('데이터 전송 실패');
    } catch (error) {
      alert('데이터 통신 오류 발생');
      console.error(error);
    }
  }

  async function addExpenseTransaction(transaction) {
    try {
      const addResponse = await axios.post(
        'http://localhost:3000/expense',
        transaction
      );

      if (addResponse.status !== 201) return alert('데이터 전송 실패');
    } catch (error) {
      alert('데이터 통신 오류 발생');
      console.error(error);
    }
  }

  async function deleteTransaction(transaction) {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3000/${transaction.type}/${transaction.id}`
      );

      if (deleteResponse.status !== 200) return alert('삭제 실패');

      fetchTransactions(); // 삭제 후 목록 갱신
    } catch (error) {
      alert('데이터 통신 오류 발생');
      console.error(error);
    }
  }

  const income = computed(() => state.income);
  const expense = computed(() => state.expense);
  const total = computed(() => state.total);
  const totalIncome = computed(() => state.totalIncome);
  const totalExpense = computed(() => state.totalExpense);

  return {
    income,
    expense,
    total,
    totalBalance,
    totalIncome,
    totalExpense,
    addIncomeTransaction,
    addExpenseTransaction,
    deleteTransaction,
    getTransactionsForMonth,
    getIncomeForMonth,
    getExpensesForMonth,
    getTotalBalanceForMonth,
    fetchTransactions,
  };
});
