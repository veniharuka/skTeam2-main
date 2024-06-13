<template>
  <!-- 수입/지출/이체 분류 -->
  <div class="input-form">
    <div class="input-header">
      <button @click="setType('income')" :class="{ active: type === 'income' }">
        수입
      </button>
      <button
        @click="setType('expense')"
        :class="{ active: type === 'expense' }"
      >
        지출
      </button>
      <button
        @click="setType('transfer')"
        :class="{ active: type === 'transfer' }"
      >
        이체
      </button>
    </div>

    <!-- 내역 input -->
    <div class="input-fields">
      <div>
        <label for="date">날짜</label>
        <input type="date" v-model="date" placeholder="Placeholder" />
      </div>
      <div>
        <label for="amount">금액</label>
        <input type="number" v-model="amount" placeholder="Placeholder" />
      </div>
      <div>
        <label for="category">분류</label>
        <select v-model="category">
          <option value="">분류를 선택해주세요</option>
          <option value="식비">식비</option>
          <option value="교통비">교통비</option>
          <option value="쇼핑">쇼핑</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div>
        <label for="description">내용</label>
        <input type="text" v-model="description" placeholder="세부사항" />
      </div>
    </div>
    <div class="addButton">
      <button @click="submitTransaction">저장</button>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const transactionStore = useTransactionStore();
const emit = defineEmits(['close']);
const type = ref('income');
const date = ref('');
const amount = ref(0);
const category = ref('');
const description = ref('');
const showModal = ref(false); // 모달을 처음에 보여주도록 설정

const setType = (newType) => {
  // console.log(newType);
  type.value = newType;
};

const submitTransaction = () => {
  console.log('!');

  if (!date.value) {
    alert('날짜를 선택해주세요.');
    return;
  }
  if (!amount.value) {
    alert('금액을 입력해주세요.');
    return;
  }
  if (!category.value) {
    alert('분류를 선택해주세요.');
    return;
  }
  if (!description.value) {
    alert('내용을 기입해주세요.');
    return;
  }
  const transaction = {
    type: type.value,
    date: date.value,
    amount: parseFloat(amount.value),
    category: category.value,
    description: description.value,
  };

  console.log(type.value);

  if (type.value === 'income') {
    transactionStore.addIncomeTransaction(transaction);
  } else {
    transactionStore.addExpenseTransaction(transaction);
  }

  // Clear the form fields after submission
  date.value = '';
  amount.value = 0;
  category.value = '';
  description.value = '';

  emit('close', false);
};
const closeModal = () => {
  emit('close', false);
};
const formatAmount = () => {
  let inputAmount = amount.value;
  if (!inputAmount) return;
  if (inputAmount % 1000 !== 0) return;
  amount.value = inputAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
</script>
