<template>
  <header>
    <div class="header_bar">
      <div class="btn_group_container">
        <div class="btn_group">
          <router-link to="/" class="btn left" :class="{ active: view === 'daily' }">일일</router-link>
          <router-link to="/cal" class="btn middle" :class="{ active: view === 'monthly' }">월별</router-link>
          <router-link to="/chart" class="btn right" :class="{ active: view === 'summary' }">합계</router-link>
        </div>
      </div>

      <router-link to="/settings" class="settings_icon">
        <i class="bi bi-gear-fill"></i>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// const route = ref('monthly'); // 반응형 데이터로 'monthly'를 기본값으로 설정
const router = useRouter();
const route = useRoute();
const view = ref(route.path === '/' ? 'daily' : route.path === '/cal' ? 'monthly' : route.path === '/chart' ? 'summary' : '');

watchEffect(() => {
  view.value = route.path === '/' ? 'daily' : route.path === '/cal' ? 'monthly' : route.path === '/chart' ? 'summary' : '';
});

function navigate(viewName) {
  if (viewName === 'daily') {
    router.push('/');
  } else if (viewName === 'monthly') {
    router.push('/cal');
  } else if (viewName === 'summary') {
    router.push('/chart');
  }
}
</script>

<style scoped>
header {
  padding: 0;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: end;
  /* text-align: center; */
}

.header_bar {
  display: flex;
  align-items: center;
  width: 100%; /* 헤더 바의 너비를 100%로 설정 */
  justify-content: space-between; /* 아이템들을 양쪽 끝으로 정렬 */
}

.btn_group_container {
  display: flex;
  justify-content: center; /* btn_group을 가운데 정렬 */
  flex-grow: 1; /* 나머지 공간을 차지하여 btn_group을 중앙에 위치시킴 */
}

.btn_group {
  width: 200px;
  display: flex;
  justify-content: center; /* 버튼을 가운데 정렬 */
  background-color: #eeeeee; /* 전체 배경색 */
  border-radius: 25px; /* 전체 그룹의 모서리를 둥글게 */
}

.btn_group .btn {
  flex: 1;
  margin: 0;
  padding: 10px 0;
  background-color: transparent; /* 버튼 배경색을 투명으로 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 30px;
  cursor: pointer; /* 마우스 커서 변경 */
  position: relative;
  z-index: 0; /* 기본 z-index */
  font-weight: bold;
  font-size: 14px;
  color: grey;
  transition: background-color 0.3s; /* 배경색 변경 애니메이션 */
}

.btn_group .btn.active {
  background-color: #96e8cd; /* 활성화된 버튼 배경색 */
  font-weight: bold;
  z-index: 2; /* 활성화된 버튼을 위로 올림 */
  color: black;
}

.settings_icon {
  font-size: 24px; /* 아이콘 크기 */
  color: black; /* 아이콘 색상 */
  cursor: pointer;
  position: absolute;
  right: 25px; /* 오른쪽에 위치 */
}

/* .btn_group button:hover {
  background-color: #def8ee; 호버 시 배경색 변경
} */
</style>
