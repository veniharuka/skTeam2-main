<template>
  <div class="summary-stats">
    <div class="stat" @click="toggleFilter('showIncome')" :class="{ active: filters.showIncome }">
      <div class="title">수입</div>
      <div class="value income">{{ formatNumber(income) }}원</div>
    </div>
    <div class="stat" @click="toggleFilter('showExpense')" :class="{ active: filters.showExpense }">
      <div class="title">지출</div>
      <div class="value expense">{{ formatNumber(expense) }}원</div>
    </div>
    <div class="stat" @click="showAll">
      <div class="title">합계</div>
      <div class="value">{{ formatNumber(balance) }}원</div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  income: Number,
  expense: Number,
  filters: Object,
});

const emit = defineEmits(['updateFilter']);

const { income, expense, filters } = toRefs(props);
const balance = computed(() => income.value - expense.value);

function formatNumber(value) {
  return value.toLocaleString();
}

function toggleFilter(filterKey) {
  const newFilters = { ...filters.value, [filterKey]: !filters.value[filterKey] };

  if (!newFilters.showIncome && !newFilters.showExpense && !newFilters.showBalance) {
    newFilters.showIncome = true;
    newFilters.showExpense = true;
    newFilters.showBalance = true;
  }

  emit('updateFilter', newFilters);
}

function showAll() {
  emit('updateFilter', {
    showIncome: true,
    showExpense: true,
    showBalance: true,
  });
}
</script>

<style scoped>
.summary-stats {
  display: flex;
  justify-content: space-between;
  height: 75px;
  background-color: #b5e3e0;
  padding: 10px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.stat {
  flex: 1;
  text-align: center;
  padding: 5px;
  font-weight: bold;
  cursor: pointer; /* 클릭 가능하게 커서 변경 */
}

.stat:not(:last-child) {
  border-right: 1px solid #629483;
}

.title {
  font-size: 15px;
  margin-bottom: 5px;
}

.value {
  font-size: 15px;
}

.income {
  color: blue;
}

.expense {
  color: red;
}
</style>
