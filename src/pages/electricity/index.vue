<template>
  <theme-config>
    <title-bar title="寝室电量查询" back-button />
    <scroll-view :scroll-y="true">
      <view class="header-view">
        <image src="@/assets/photos/electricity.svg" />
      </view>
      <view class="flex-column">
        <card class="info-card">
          <view class="dormitory-info">
            <view class="icon-wrapper">
              <view class="iconfont icon-electricity" />
            </view>
            <view class="text-wrapper">
              <text>{{ roomInfo.roomName }}</text>
            </view>
          </view>
        </card>

        <w-list>
          <w-list-item class="electricity-list-item">
            <view class="text-wrapper">
              <text> 剩余总电量 </text>
              <text :class="[isUrgent ? 'dangerous' : 'normal', 'rest-number']">
                {{ balance }}
              </text>
              <text> 度 </text>
            </view>
          </w-list-item>
        </w-list>
        <text
          v-if="isUrgent"
          class="dangerous"
          style="font-size: .8rem"
        >
          温馨提示: 电量已不足20度，请及时充电
        </text>

        <w-list @tap="nav2Consumption">
          <w-list-item arrow="right" class="electricity-list-item">
            <view class="text-wrapper" style="justify-content: space-between;">
              <text> 每日用电记录 </text>
              <text v-if="consumptionLoading" class="today">
                正在加载...
              </text>
              <text v-else-if="todayConsumption" class="today">
                昨日使用: {{ todayConsumption }}
              </text>
            </view>
          </w-list-item>
        </w-list>

        <w-list @tap="nav2Record">
          <w-list-item arrow="right" class="electricity-list-item">
            <view class="text-wrapper">
              <text> 缴费记录 </text>
            </view>
          </w-list-item>
        </w-list>

        <w-list @tap="nav2Subscribe">
          <w-list-item arrow="right" class="electricity-list-item">
            <view class="text-wrapper">
              <text> 低电提醒消息订阅 </text>
            </view>
          </w-list-item>
        </w-list>
      </view>
    </scroll-view>
    <bottom-panel>
      <picker
        mode="selector"
        :range="options"
        :value="selectedIndex"
        class="picker-wrapper"
        @change="onPickerChange"
      >
        <w-button class="selector">
          {{ selectedOption }}
        </w-button>
      </picker>
    </bottom-panel>
  </theme-config>
</template>

<script setup lang="ts">
import "./index.scss";
import {
  Card,
  ThemeConfig,
  TitleBar,
  WList,
  WListItem,
  BottomPanel,
  WButton
} from "@/components";
import { useRequest } from "@/hooks";
import { YxyService } from "@/services";
import { computed, ref, watch } from "vue";
import store, { serviceStore } from "@/store";
import Taro from "@tarojs/taro";

const options = ref(["朝晖/屏峰", "莫干山"]);
const selectedIndex = ref(serviceStore.electricity.selectIndex);
const valueMap = {
  "朝晖/屏峰": "zhpf",
  "莫干山": "mgs"
};

// eslint-disable-next-line no-warning-comments
// TODO: 优化双向同步操作
// 双向同步 selectedIndex 和 serviceStore.electricity.selectedIndex
watch(
  selectedIndex,
  (newValue) => {
    serviceStore.electricity.selectIndex = newValue;
  }
);
watch(
  () => serviceStore.electricity.selectIndex,
  (newValue) => {
    selectedIndex.value = newValue;
  }
);

const selectedOption = computed(() => options.value[selectedIndex.value]);
const onPickerChange = (event: { detail: { value: number } }) => {
  selectedIndex.value = event.detail.value;

  const selectedValue = valueMap[selectedOption.value];
  serviceStore.electricity.electricityCampus = selectedValue;
  getQueryBalance({ campus: selectedValue });
  getQueryConsumption({ campus: selectedValue });
};

const roomInfo = computed(() => ({
  roomName: serviceStore.electricity.roomName,
  roomCode: serviceStore.electricity.roomCode
}));

const balance = computed(() => serviceStore.electricity.balance);

const todayConsumption = computed(() => (serviceStore.electricity.todayConsumption));

const { run: getQueryBalance } = useRequest(YxyService.queryBalance, {
  manual: true,
  onBefore: () => {
    Taro.showLoading({ title: "正在加载" });
  },
  onSuccess: (response) => {
    if (response.data.code === 1) {
      store.commit("setElectricityStore", {
        roomName: response.data.data.display_room_name,
        roomCode: response.data.data.room_code,
        balance: response.data.data.soc
      });
    } else {
      throw new Error(response.data.msg || response.errMsg);
    }
    Taro.hideLoading();
  },
  onError: (error) => {
    if (error instanceof Error)
      return error.message;
    else return `查询电费余额失败\r\n${error.errMsg}`;
  }
});

const {
  run: getQueryConsumption,
  loading: consumptionLoading
} = useRequest(YxyService.queryConsumption, {
  defaultParams: {
    campus: serviceStore.electricity.electricityCampus
  },
  onSuccess: (response) => {
    if (response.data.code === 1) {
      store.commit("setConsumption", response.data.data[0].used);
    } else if (response.data.code === 200525) {
      selectedIndex.value = 0;
      serviceStore.electricity.selectedIndex = 0;
      serviceStore.electricity.electricityCampus = "zhpf";
    } else {
      throw new Error(response.data.msg);
    }
  },
  onError: (error) => {
    if (error instanceof Error)
      return error.message;
  }
});

const isUrgent = computed(() => {
  if (balance.value) return balance.value < 20;
  else return false;
});

function nav2Record() {
  Taro.navigateTo({
    url: "/pages/electricity/record/index"
  });
}

function nav2Consumption() {
  Taro.navigateTo({
    url: "/pages/electricity/consumption/index"
  });
}

function nav2Subscribe() {
  Taro.navigateTo({
    url: "/pages/electricity/subscribe/index"
  });
}

</script>
