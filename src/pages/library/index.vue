<template>
  <theme-config>
    <title-bar title="借阅信息" back-button />
    <scroll-view :scroll-y="true">
      <view class="header-view">
        <image src="@/assets/photos/library.svg" />
        <view class="summary">
          <view>
            借阅：
            <text>{{ currentCount }}</text>
            本
          </view>
          <view>
            超期：
            <text>
              {{ currentExpiredCount }}
            </text>
            本
          </view>
        </view>
      </view>
      <card class="borrow-card">
        <template #header>
          <view class="col" />
          <view class="col">
            <view class="swicher">
              <w-button
                :class="{ 'button-not-active': !isSelectToday }"
                @tap="todayClick"
              >
                当前
              </w-button>
              <w-button
                :class="{ 'button-not-active': !isSelectHistory }"
                @tap="historyClick"
              >
                历史
              </w-button>
            </view>
          </view>
          <view class="col">
            <refresh-button :is-refreshing="isRefreshing" @tap="updateData" />
          </view>
        </template>
        <view>
          <view class="flex-column">
            <card v-if="!borrowList.length" class="no-item">
              无借阅记录
            </card>
            <card
              v-for="(item, index) in borrowList"
              :key="index"
              class="book-card"
              :style="{
                '--bg-color': index % 2 ? 'var(--wjh-color-primary-dark)' : 'var(--wjh-color-primary)'
              } as CSSProperties"
            >
              <view class="book-name">
                {{ item.title }}
              </view>
              <view class="borrow-time">
                <view>
                  {{ `借阅日期：${item.loanDate}` }}
                </view>
                <view v-if="item.returnDate">
                  {{ `归还日期：${item.returnDate}` }}
                </view>
                <view v-else-if="item.normReturnDate">
                  {{ `应还日期：${item.normReturnDate}` }}
                </view>
              </view>
              <view class="book-index">
                {{ index + 1 }}
              </view>
            </card>
          </view>
        </view>
      </card>
    </scroll-view>
  </theme-config>
</template>

<script setup lang="ts">
import "./index.scss";
import { computed, onMounted, ref, CSSProperties } from "vue";
import { Card, RefreshButton, ThemeConfig, TitleBar, WButton } from "@/components";
import { LibraryService } from "@/services";
import { serviceStore } from "@/store";
import { BorrowBooksInfo } from "@/types/BorrowBooksInfo";
import dayjs from "dayjs";

const isSelectToday = ref(true);
const isSelectHistory = ref(false);
const isRefreshing = ref(false);

onMounted(() => {
  LibraryService.getLibraryCurrent();
  LibraryService.getLibraryHistory();
});

const borrowList = computed((): BorrowBooksInfo[] => {
  if (isSelectToday.value) return current.value;
  else if (isSelectHistory.value) return history.value;
  return [];
});

const history = computed(() => {
  return serviceStore.library.history;
});

const current = computed(() => {
  return serviceStore.library.current ?? [];
});

const currentCount = computed(() => {
  return current.value ? current.value.length : 0;
});

/** 超期本数 */
const currentExpiredCount = computed(() => {
  const expired = current.value.filter((item) =>
    dayjs(item.normReturnDate).isBefore(dayjs())
  );

  return expired.length;
});

async function updateData() {
  if (isRefreshing.value) return;
  isRefreshing.value = true;
  if (isSelectToday.value) await LibraryService.getLibraryCurrent();
  else await LibraryService.getLibraryHistory();
  isRefreshing.value = false;
}

function historyClick() {
  isSelectToday.value = false;
  isSelectHistory.value = true;
}

function todayClick() {
  isSelectToday.value = true;
  isSelectHistory.value = false;
}
</script>
