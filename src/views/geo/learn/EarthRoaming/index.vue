<template>
  <div class="main-content">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NmY4OGRkZS03ZTljLTQ5MDMtYmUwZC0wNmM2ZjdmM2M1MzMiLCJpZCI6MTI2MjUzLCJpYXQiOjE2NzczMTI2ODJ9.KO5KCez-xGcJBJfY8XYWAlUXHO4WWrZUm6tCZ1MfCWM";
defineOptions({
  name: "EarthRoaming"
});

const initViewer = () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {});

  // 隐藏版权信息
  viewer._cesiumWidget._creditContainer.style.display = "none";
};

onMounted(() => {
  initViewer();
});
</script>

<style lang="scss" scoped>
.main-content {
  height: 100% !important;
  margin: 0 !important;
}

#cesiumContainer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
