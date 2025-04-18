<template>
  <theme-config :show-bg-image="false">
    <title-bar title="校园卡" back-button />
    <scroll-view :scroll-y="true">
      <view class="school-card">
        <image mode="aspectFit" src="@/assets/photos/card.svg" />
        <text class="balance">
          ¥ {{ balance }}
        </text>
      </view>
      <card class="consume-card">
        <template #header>
          <view class="col" />
          <view class="col">
            <picker
              mode="date"
              :value="selectedDate"
              :start="dayjs().subtract(69, 'day').format('YYYY-MM-DD')"
              :end="dayjs().format('YYYY-MM-DD')"
              @change="handleChangeDate"
            >
              <w-button>{{ selectedDate }}</w-button>
            </picker>
          </view>
          <view class="col">
            <refresh-button
              :is-refreshing="loading"
              @tap="updateData"
            />
          </view>
        </template>
        <view class="flex-column">
          <card v-if="consumeList.length === 0" style="text-align: center">
            <view> 无消费记录 </view>
          </card>
          <template v-else>
            <view> 该日消费: {{ totalConsume.toFixed(2) }} </view>
            <card
              v-for="(item, index) in consumeList"
              :key="index"
              class="consume-item-card"
              size="small"
              :class="{
                'consume-item-positive': parseFloat(item.money) >= 0,
                'consume-item-negative': parseFloat(item.money) < 0
              }"
            >
              <view class="content-wrapper">
                <view class="col">
                  <text class="transactions">
                    ¥ {{ Math.abs(parseFloat(item.money)).toFixed(1) }}
                  </text>
                </view>
                <view class="col">
                  <view>地点： {{ item.address }}</view>
                  <view>
                    时间： {{ item.time.split(' ')[0] }}
                    &nbsp;
                    {{ item.time.split(' ')[1] }}
                  </view>
                </view>
              </view>
            </card>
          </template>
        </view>
      </card>
    </scroll-view>
  </theme-config>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Card, RefreshButton, ThemeConfig, TitleBar, WButton } from "@/components";
import dayjs from "dayjs";
import { CardConsume } from "@/types/CardConsume";
import store, { serviceStore } from "@/store";

import "./index.scss";
import { useRequest } from "@/hooks";
import { YxyService } from "@/services";
import { Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";

const selectedDate = ref(dayjs().format("YYYY-MM-DD")); // YYYY-MM-DD

const balance = computed(() => serviceStore.card.balance || 0);
const records = ref<CardConsume[]>([]);

useRequest(YxyService.querySchoolCardBalance, {
  onSuccess: (res) => {
    if (res.data.code === 1) {
      if (Number.isFinite(parseFloat(res.data.data)))
        store.commit("setCardBalance", res.data.data);
      else throw new Error("无效余额值");
    } else if (res.data.code === 200514) {
      Taro.showModal({
        title: "查询余额失败",
        content: res.data.msg,
        confirmText: "重新登录",
        success: (res) => {
          if (res.confirm)
            Taro.navigateTo({ url: "/pages/bind/index" });
        }
      });
    } else throw new Error(res.data.msg);
  },
  onError: (error) => {
    if (!(error instanceof Error)) return `查询校园卡余额\r\n${error.errMsg}`;
    else return `查询校园卡余额\r\n${error.message}`;
  }
});

const { run: queryRecord, loading } = useRequest(
  YxyService.querySchoolCardRecord, {
    defaultParams: { queryTime: dayjs().format("YYYYMMDD") },
    onSuccess: (response) => {
      if (response.data.code === 1) {
        records.value = response.data.data || [];
        store.commit("setCardToday", records.value);
      } else throw new Error(response.data.msg);
    },
    onError: (e) => {
      if (e instanceof Error) return e.message;
    }
  }
);

const consumeList = computed(() => {
  return records.value
    .filter((item) => parseFloat(item.money) !== 0);
});

const totalConsume = computed(() => {
  return consumeList.value.reduce((acc, cur) => {
    if (parseFloat(cur.money) < 0) {
      acc += Math.abs(parseFloat(cur.money));
    }
    return acc;
  }, 0);
});

async function updateData() {
  queryRecord({ queryTime: selectedDate.value.split("-").join("") });
}

const handleChangeDate = (e) => {
  selectedDate.value = e.detail.value;
  queryRecord({ queryTime: selectedDate.value.split("-").join("") });
};

</script>
