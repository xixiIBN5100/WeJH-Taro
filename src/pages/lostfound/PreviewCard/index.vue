<template>
  <view :class="[
    styles.container,
    source.type ? styles.lost : styles.found
  ]">
    <view :class="styles.header">
      <view :class="styles.title">
        {{ source.type ? "失物招领": "寻物启事" }}
      </view>
      <view :class="styles.joint" v-if="isForyou">
        <image
          src="https://api.cnpatrickstar.com/img/92a63e97-cd3e-411b-b4aa-8e6fad5fbd00.jpg"
          alt="logo_fy"
          :class="styles.logo"
          mode="aspectFit"
        />
        <text>x</text>
        <image
          src="https://api.cnpatrickstar.com/img/15c05a4c-7c2d-4561-9536-80614b7b65b8.jpg"
          alt="logo_jh"
          :class="styles.logo"
          mode="aspectFit"
        />
      </view>
    </view>
    <view :class="styles.body" v-if="!source.type">
      <view :class="styles.content" class="flex-column">
         <text space="emsp" v-show="source.item_name" :class="styles.text">
           物体名称  {{ source.item_name }}
         </text>
         <text space="emsp" v-show="source.lost_or_found_place" :class="styles.text">
           遗失地点  {{ source.lost_or_found_place }}
         </text>
         <text space="emsp" v-show="source.lost_or_found_time" :class="styles.text">
           遗失时间  {{ source.lost_or_found_time }}
         </text>
         <text space="emsp" v-show="source.contact" :class="styles.text">
           联系方式  {{ source.contact }}
         </text>
         <text space="emsp" v-show="source.introduction" :class="styles.text">
           物品介绍  {{ source.introduction }}
         </text>
      </view>
      <view :class="styles['img-list']">
        <view :class="[
          styles['img-container'],
          imageList.length > 1 ? styles.multiple : undefined
        ]">
          <view
            :key="`${source.id}-${item}`"
            v-for="item in imageList"
            :class="styles['img-wrapper']"
          >
            <image
              :class="styles.image"
              style="width: 100Px ;height: 100Px"
              mode="aspectFill"
              :src="item"
              @tap="() => handlePreviewImages(item)"
              :onLoad="handleLoadFinish"
            />
          </view>
        </view>
      </view>
    </view>
    <view :class="styles.body" v-else-if="source.type">
      <view :class="styles.content" class="flex-column">
        <text space="emsp" v-show="source.item_name" :class="styles.text">
          物体名称  {{ source.item_name }}
        </text>
        <text space="emsp" v-show="source.lost_or_found_place" :class="styles.text">
          拾得地点  {{ source.lost_or_found_place }}
        </text>
        <text space="emsp" v-show="source.lost_or_found_time" :class="styles.text">
          拾得时间  {{ source.lost_or_found_time }}
        </text>
        <text space="emsp" v-show="source.pickup_place" :class="styles.text">
          领取地点  {{ source.pickup_place }}
        </text>
        <text space="emsp" v-show="source.introduction" :class="styles.text">
          物品介绍  {{ source.introduction }}
        </text>
      </view>
      <view :class="styles['img-list']">
        <view :class="[
          styles['img-container'],
          imageList.length > 1 ? styles.multiple : undefined
        ]">
          <view
            :key="`${source.id}-${item}`"
            v-for="item in imageList"
            :class="styles['img-wrapper']"
          >
            <image
              :class="styles.image"
              style="width: 100Px ;height: 100Px"
              mode="aspectFill"
              :src="item"
              @tap="() => handlePreviewImages(item)"
              :onLoad="handleLoadFinish"
            />
          </view>
        </view>
      </view>
    </view>
    <view :class="styles.footer" class="flex-column">
      <text>业务服务: {{ source.publisher }}</text>
      <text>发布时间: {{ timeFormat(source.publish_time) }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { LostfoundRecord } from "@/types/Lostfound";
import { toRefs, computed, ref } from "vue";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import styles from "./index.module.scss";

const props = defineProps<{
  source: LostfoundRecord;
}>();
const needFixWidth = ref(false);

const imageList = computed(() => [
  source.value?.img1 || null,
  source.value?.img2 || null,
  source.value?.img3 || null
].filter(item => !!item) as string[]);

const { source } = toRefs(props);

const isForyou = ref(false);
if (source.value.publisher.slice(0,4) === "“For") {
  isForyou.value = true;
}

const handlePreviewImages = (url: string) => {
  // FIXME: control enter onShow
  Taro.previewImage({
    current: url,
    urls: imageList.value
  });
};

const handleLoadFinish = ({ detail: { height, width }}) => {
  if (height > width) needFixWidth.value = false;
  else needFixWidth.value = true;
};

const timeFormat= (time: string) => {
  return dayjs(time).format("YYYY年MM月DD日");
};
</script>
