<template>
  <NuxtLayout name="coreshop-shop-header-back">
    <CoreshopTitle :title="$t('门店列表')"></CoreshopTitle>
    <div class="store-box">
      <CoreshopStore @on-choose-store="handleChooseStore" :choose="false"></CoreshopStore>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryStoreList } from "@/composables/store";
import { Result } from "@/model/result";
import { useConfigStore } from "@/store";
import { Store } from "@/model/store";
import { Config } from "@/model/config";

definePageMeta({layout: false})

const storeData: UnwrapRef<{
  list: Array<any>;
}> = reactive({
  list: [],
});

const getStoreList: Result<Array<Store>> = await queryStoreList({
  limit: 99999,
  page: 1,
});
storeData.list = getStoreList.data;

const config: Config = useConfigStore().getConfig;

useHead({
  script: [
    {
      src: `https://map.qq.com/api/gljs?v=1.exp&key=${config.qqMapKey}`,
      type: "text/javascript",
    },
  ],
});

const getLatLng = (item: string) => {
  return item.split(",").map((p) => Number(p));
};
let map = null;
const initMap = () => {
  if (process.client) {
    let center = new window.TMap.LatLng(
      getLatLng(storeData.list[0].coordinate)[0],
      getLatLng(storeData.list[0].coordinate)[1]
    );
    //初始化地图
    map = new window.TMap.Map(document.getElementById("container"), {
      center: center, //设置地图中心点坐标
    });

    let markerLayer = new window.TMap.MultiMarker({
      map: map, //指定地图容器
      //样式定义
      styles: {
        //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
        myStyle: new window.TMap.MarkerStyle({
          width: 30, // 点标记样式宽度（像素）
          height: 30, // 点标记样式高度（像素）
          src: "images/address.png", //图片路径
          //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
          anchor: { x: 16, y: 32 },
        }),
      },
      //点标记数据数组
      geometries: storeData.list.map((item) => {
        return {
          id: item.id, //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          // "styleId": 'myStyle',  //指定样式id
          position: new window.TMap.LatLng(
            getLatLng(item.coordinate)[0],
            getLatLng(item.coordinate)[1]
          ), //点标记坐标位置
          properties: {
            //自定义属性
            title: item.storeName,
          },
        };
      }),
    });
    //初始化infoWindow
    let infoWindow = new window.TMap.InfoWindow({
      map: map,
      position: new window.TMap.LatLng(
        getLatLng(storeData.list[0].coordinate)[0],
        getLatLng(storeData.list[0].coordinate)[1]
      ),
      offset: { x: 20, y: -32 }, //设置信息窗相对position偏移像素
    });
    infoWindow.close(); //初始关闭信息窗关闭
    //监听标注点击事件
    markerLayer.on("click", function (evt) {
      //设置infoWindow
      infoWindow.open(); //打开信息窗
      infoWindow.setPosition(evt.geometry.position); //设置信息窗位置
      infoWindow.setContent(evt.geometry.properties.title); //设置信息窗内容
    });
  }
};

// initMap();

const handleChooseStore = (item: any) => {
  // map.setContent(new window.TMap.LatLng(
  //     getLatLng(item.coordinate)[0],
  //     getLatLng(item.coordinate)[1]))
};
</script>

<style lang="scss" scoped>
.store-box {
}
</style>
