<script setup lang="ts">
import { Card, WButton, WModal } from "@/components";
import { helpText } from "@/constants/copywriting";
import { UserService } from "@/services";
import store, { serviceStore } from "@/store";
import Taro from "@tarojs/taro";
import { computed, ref } from "vue";

const zfpass = ref("");
const user = computed(() => serviceStore.user);
const helpContent = helpText.bind.zf;
const isShowHelp = ref(false);

async function bindZFClick() {
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"{}[\]\\|`~]*$/;
  if (!regex.test(zfpass.value)) {
    Taro.showToast({
      title: "输入存在中文字符或其他非法字符,请重新输入！",
      icon: "none"
    });
    return;
  }
  Taro.showLoading({
    title: "正在绑定",
    mask: true
  });
  const res = await UserService.bindZF(
    { password: zfpass.value }
  );
  if (res.code === 1) {
    await Taro.showToast({
      icon: "success",
      title: "绑定成功"
    });
    if (serviceStore.homecard.selected.length === 0) {
      store.commit("addHomeCardItem", "lessons-table-quick-view");
    }
  } else {
    await Taro.showToast({
      icon: "none",
      title: res.msg
    });
  }
}

</script>

<template>
  <card class="bind-card">
    <template #header>
      <text>绑定账号</text>
      <view class="form-help-wrapper">
        <view
          class="form-help"
          @tap="() => isShowHelp = !isShowHelp"
        >
          <view class="iconfont icon-help" />
        </view>
      </view>
    </template>
    <text>正方教务系统</text>
    <view>
      <input
        v-if="!user.isBindZF"
        v-model="zfpass"
        type="password"
        placeholder="请输入密码"
      >
      <input
        v-else
        v-model="zfpass"
        type="password"
        placeholder="*******"
      >
    </view>
    <template #footer>
      <w-button
        block
        @tap="bindZFClick"
      >
        确认绑定
      </w-button>
    </template>
  </card>
  <w-modal
    v-model:show="isShowHelp"
    :content="helpContent"
  />
</template>
