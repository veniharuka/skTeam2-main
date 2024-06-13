<template>
  <div>
    <Doughnut v-if="chartDataReady" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    required: true,
  },
});

const chartDataReady = computed(() => {
  return (
    props.chartData.labels.length > 0 &&
    props.chartData.datasets[0].data.length > 0
  );
});

watch(
  () => props.chartData,
  (newValue) => {
    console.log('props 바뀜!!');
  },
  { deep: true }
);
</script>
