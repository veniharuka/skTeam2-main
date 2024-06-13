<template>
  <div>
    
    <div class="chart-container">
      <DoughnutChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>
    <ul class="item-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        :style="{
          backgroundColor: item.backgroundColor,
          borderColor: item.borderColor,
        }"
      >
        <img :src="item.image" alt="" class="item-image" />
        <div class="item-details">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-amount">{{ item.amount }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DoughnutChart from "@/components/DoughnutChart.vue";

const chartData = ref({
  labels: ["식비", "교통비", "여가비", "재테크", "고정비", "기타"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderWidth: 1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        padding: 10,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  },
});

const items = ref([
  {
    image: "./public/food.png",
    name: "식비",
    amount: "$1200",
    backgroundColor: "#FF6384",
    borderColor: "#FF6384",
  },
  {
    image: "./public/traffic.png",
    name: "교통비",
    amount: "$300",
    backgroundColor: "#36A2EB",
    borderColor: "#36A2EB",
  },
  {
    image: "./public/gamepad.png",
    name: "여가비",
    amount: "$1500",
    backgroundColor: "#FFCE56",
    borderColor: "#FFCE56",
  },
  {
    image: "./public/dollar.png",
    name: "재테크",
    amount: "$700",
    backgroundColor: "#4BC0C0",
    borderColor: "#4BC0C0",
  },
  {
    image: "./public/house.png",
    name: "고정비",
    amount: "$400",
    backgroundColor: "#9966FF",
    borderColor: "#9966FF",
  },
  {
    image: "./public/food.png",
    name: "기타",
    amount: "$500",
    backgroundColor: "#FF9F40",
    borderColor: "#FF9F40",
  },
]);
</script>

<style scoped>
.chart-container {
  margin-bottom: 10px; /* 도넛 차트와 리스트 사이의 간격을 줄입니다. */
  text-align: center; /* 내용을 가운데 정렬합니다. */
}

.item-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.item-list li {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 아이템들을 좌우 정렬하게 설정합니다. */
  border-width: 1px;
  border-style: solid;
  margin: 0 auto 10px; /* 위 0, 좌우 자동, 아래 20px 간격을 줍니다. */
  padding: 5px;
  max-width: 350px; /* 각 리스트 아이템의 최대 너비를 설정합니다. */
  gap: 10px;
}

.item-list li img.item-image {
  width: 40px; /* 이미지의 너비를 설정합니다. */
  height: auto; /* 이미지의 높이를 자동으로 조정합니다. */
  margin-right: 10px;
}

.item-list li .item-details {
  flex: 1; /* 내용이 넘치지 않도록 유연하게 조정합니다. */
  display: flex;
  align-items: center;
}

.item-list li .item-details .item-name {
  margin: 0;
  font-weight: bold;
  font-size: 14px; /* 항목 이름의 글꼴 크기를 조정합니다. */
}

.item-list li .item-details .item-amount {
  margin-left: auto; /* amount를 항상 우측에 정렬합니다. */
  font-size: 14px; /* 금액의 글꼴 크기를 키웁니다. */
  font-weight: bold; /* 금액을 굵게 표시합니다. */
}

@media (min-width: 375px) {
  /* 375px 이상의 너비에서 적용되는 스타일 */
  .chart-container {
    max-width: 350px; /* 도넛 차트의 최대 너비를 설정합니다. */
    margin: 0 auto; /* 가운데 정렬합니다. */
  }
}
</style>
