<template>
  <div class="container">
    <Header />

    <!-- 월 변경 바 -->
    <div class="calendar_header">
      <button @click="prevMonth">&lt;</button>
      <div class="calendar_month">{{ year }}년 {{ month }}월</div>
      <button @click="nextMonth">&gt;</button>
    </div>

    <SummaryStats
      :income="totalIncome"
      :expense="totalExpense"
      :filters="filters"
      @updateFilter="setFilter"
    />

    <!-- 요일 -->
    <div class="days_of_week mt-3">
      <div
        class="days"
        v-for="(day, index) in daysOfWeek"
        :key="day"
        :class="{ sunday: index === 0, saturday: index === 6 }"
      >
        {{ day }}
      </div>
    </div>
    <!-- 날짜 -->
    <div class="grid">
      <!-- 시작 날짜 전에 빈 칸 생성 -->
      <div class="day" v-for="blank in blankDays" :key="'blank-' + blank"></div>
      <div class="day" v-for="day in days" :key="day.dateString">
        <div
          class="date"
          :class="{
            sunday: new Date(year, month - 1, day.date).getDay() === 0,
            saturday: new Date(year, month - 1, day.date).getDay() === 6,
          }"
        >
          <div class="date">{{ day.date }}</div>
          <div class="day_details">
            <div v-if="filters.showIncome && day.income" class="income">
              {{ formatNumber(day.income) }}
            </div>
            <div v-if="filters.showExpense && day.expense" class="expense">
              {{ formatNumber(day.expense) }}
            </div>
            <div v-if="filters.showBalance && day.balance" class="balance">
              {{ formatNumber(day.balance) }}
            </div>
          </div>
        </div>
      </div>
      <!-- 마지막 날짜 뒤에 빈 칸 생성 -->
      <div
        class="day"
        v-for="blank in blankDaysEnd"
        :key="'blank-end-' + blank"
      ></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch, computed } from 'vue';
import Header from './Header.vue'; // Header 컴포넌트 가져오기
import SummaryStats from './SummaryStats.vue'; // SummaryStats 컴포넌트 가져오기
import { useTransactionStore } from '@/stores/transaction';

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const days = ref([]);
const blankDays = ref([]); // 달력 시작부분 빈 칸 배열 추가
const blankDaysEnd = ref([]); // 달력 끝부분 빈 칸 배열 추가
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const filters = ref({
  showIncome: true,
  showExpense: true,
  showBalance: true,
});

const transactionStore = useTransactionStore();

const { fetchTransactions } = transactionStore;

const income = computed(() => transactionStore.income);
const expense = computed(() => transactionStore.expense);

const data = ref({});

const totalIncome = computed(() => transactionStore.totalIncome);
const totalExpense = computed(() => transactionStore.totalExpense);

async function fetchData() {
  let makeObj = {};

  const incomeArr = income.value;

  for (let i = 0; i < incomeArr.length; i++) {
    const sliceDate = incomeArr[i].date.slice(0, 10);
    makeObj[sliceDate] = {};
  }

  for (let i = 0; i < incomeArr.length; i++) {
    const sliceDate = incomeArr[i].date.slice(0, 10);
    if (makeObj[sliceDate].income === undefined) {
      makeObj[sliceDate].income = parseInt(incomeArr[i].amount);
    } else {
      makeObj[sliceDate].income += parseInt(incomeArr[i].amount);
    }
  }

  const expenseArr = expense.value;

  for (let i = 0; i < expenseArr.length; i++) {
    const sliceDate = expenseArr[i].date.slice(0, 10);
    if (sliceDate in makeObj === false) {
      makeObj[sliceDate] = {};
    }
  }

  for (let i = 0; i < expenseArr.length; i++) {
    const sliceDate = expenseArr[i].date.slice(0, 10);
    if (makeObj[sliceDate].expense === undefined) {
      makeObj[sliceDate].expense = parseInt(expenseArr[i].amount);
    } else {
      makeObj[sliceDate].expense += parseInt(expenseArr[i].amount);
    }
  }

  data.value = makeObj;

  updateCalendar(year.value, month.value);
}

onMounted(() => {
  fetchData();
});

watch([year, month, data], () => {
  updateCalendar(year.value, month.value);
});

function updateCalendar(year, month) {
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 첫 번째 날의 요일 계산
  const lastDateOfMonth = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜 계산
  const lastDayOfMonth = new Date(year, month - 1, lastDateOfMonth).getDay(); // 마지막 날의 요일 계산

  blankDays.value = Array(firstDayOfMonth).fill(null); // 빈 칸 배열 설정
  days.value = generateDays(year, month); // 날짜 배열 설정
  blankDaysEnd.value = Array((7 - (lastDayOfMonth + 1)) % 7).fill(null); // 마지막 날짜 뒤의 빈 칸 배열 설정
}

function prevMonth() {
  month.value -= 1;
  if (month.value < 1) {
    month.value = 12;
    year.value -= 1;
  }
  updateCalendar(year.value, month.value); // 달력 업데이트 함수 호출
}

function nextMonth() {
  month.value += 1;
  if (month.value > 12) {
    month.value = 1;
    year.value += 1;
  }
  updateCalendar(year.value, month.value); // 달력 업데이트 함수 호출
}

function generateDays(year, month) {
  const days = [];
  const date = new Date(Date.UTC(year, month - 1, 1)); // UTC 시간을 사용하여 날짜 생성

  while (date.getUTCMonth() === month - 1) {
    const dateString = date.toISOString().split('T')[0]; // 올바른 형식의 날짜 문자열 생성
    days.push({
      date: date.getUTCDate(), // UTC 날짜를 사용
      dateString, // 날짜 문자열을 추가하여 키로 사용
      income: data.value[dateString]?.income || 0,
      expense: data.value[dateString]?.expense || 0,
      balance:
        (data.value[dateString]?.income || 0) -
        (data.value[dateString]?.expense || 0),
    });
    date.setUTCDate(date.getUTCDate() + 1); // 날짜를 하루씩 증가
  }
  return days;
}

// 필터링된 일별 데이터를 계산하는 함수
const filteredDays = computed(() => {
  return days.value.map((day) => ({
    ...day,
    showIncome: filters.value.showIncome ? day.income : 0,
    showExpense: filters.value.showExpense ? day.expense : 0,
    showBalance: filters.value.showBalance ? day.balance : 0,
  }));
});

// 특정 조건에 맞는지 확인하는 함수
function isFiltered(day) {
  if (filters.value.showIncome && day.income > 0) {
    return true;
  }
  if (filters.value.showExpense && day.expense > 0) {
    return true;
  }
  if (filters.value.showBalance && day.balance !== 0) {
    return true;
  }
  return false;
}

//달력에 뜬 숫자들을 콤마 처리해줌
function formatNumber(value) {
  return value.toLocaleString();
}

function setFilter(newFilters) {
  filters.value = { ...filters.value, ...newFilters };
}

updateCalendar(year.value, month.value); // 초기 달력 설정
</script>

<style scoped>
.container {
  max-width: 375px;
  margin: 0 auto; /* 가운데 정렬 */
}
.calendar_header {
  display: flex;
  height: 80px;
  font-size: 17px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0 20px;
}

.calendar_month {
  font-weight: bold;
}

.days_of_week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 12px;
  height: 30px;
  text-align: center;
}

.days {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 30px;
  font-weight: bold;
}
.sunday {
  color: red;
}
.saturday {
  color: blue;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
  height: 80px;
  font-weight: bold;
  position: relative; /* 부모 요소를 기준으로 자식 요소를 배치 */
}

.date {
  font-weight: normal;
  font-size: 10px;
  text-align: left;
}

.day_details {
  font-size: 9px;
  position: absolute; /* 부모 요소를 기준으로 위치 설정 */
  text-align: right; /* 텍스트를 오른쪽 정렬 */
  font-weight: bold;
  bottom: 3px;
  right: 5px;
}

.income {
  color: blue;
}

.expense {
  color: red;
}

.balance {
  color: green;
}
</style>
