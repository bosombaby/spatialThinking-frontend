<template>
  <div class="flex-bc gap-x-4">
    <canvas class="flex-1 h-full" ref="rootDom"></canvas>
    <div
      class="w-56 h-full shadow rounded-md bg-white flex flex-col items-center"
    >
      <div class="font-bold my-4">操作栏</div>
      <div class="flex flex-col gap-y-2">
        <div class="flex items-center">
          <span>长度：</span>
          <el-input-number
            v-model="modelConfig.width"
            :min="0.1"
            :max="10"
            :step="0.3"
            @change="handleModelConfig"
          />
        </div>
        <div class="flex items-center">
          <span>高度：</span>
          <el-input-number
            v-model="modelConfig.height"
            :min="0.1"
            :max="10"
            :step="0.3"
            @change="handleModelConfig"
          />
        </div>
        <div class="flex">
          <span>深度：</span>
          <el-input-number
            v-model="modelConfig.depth"
            :min="0.1"
            :max="10"
            :step="0.3"
            @change="handleModelConfig"
          />
        </div>
        <div class="flex items-center">
          <span>栅格化：</span>
          <el-switch
            v-model="modelConfig.isOpenWireframe"
            @change="
              () => {
                target.material.wireframe = modelConfig.isOpenWireframe;
              }
            "
          />
        </div>
        <div class="flex items-center">
          <span>坐标系：</span>
          <el-switch
            v-model="modelConfig.isShowAxisHelper"
            @change="
              () => {
                modelConfig.isShowAxisHelper
                  ? scene.add(axisHelper)
                  : scene.remove(axisHelper);
              }
            "
          />
        </div>
        <div class="flex items-center">
          <span>自动旋转：</span>
          <el-switch
            v-model="modelConfig.isAutoRotate"
            @change="
              () => {
                modelConfig.isAutoRotate
                  ? (controls.autoRotate = true)
                  : (controls.autoRotate = false);
              }
            "
          />
        </div>
        <div class="flex items-center">
          <el-button plain>重置</el-button>
          <el-button type="primary">分享</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import baseTexture from "@/assets/textures/crate.png";
defineOptions({
  name: "OperateGeometry"
});
const rootDom = ref(null);

const resetConfig = {
  width: 1,
  height: 1,
  depth: 1,
  isOpenWireframe: false,
  isShowAxisHelper: true,
  isAutoRotate: true
};

const modelConfig = reactive({
  width: 1,
  height: 1,
  depth: 1,
  isOpenWireframe: false,
  isShowAxisHelper: true,
  isAutoRotate: true
});

let controls;
let scene, axisHelper, camera, renderer;
let target;

const getCanvasSize = () => {
  return {
    width: rootDom.value.clientWidth,
    height: rootDom.value.clientHeight
  };
};

const initViewer = () => {
  const { width, height } = getCanvasSize();

  scene = new THREE.Scene();

  // 物体
  let geometry = new THREE.BoxGeometry(modelConfig.width, 1, 1);
  let texture = new THREE.TextureLoader().load(baseTexture);
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    wireframe: modelConfig.isOpenWireframe
  });
  target = new THREE.Mesh(geometry, material);
  scene.add(target);
  console.log(target);

  //坐标轴
  axisHelper = new THREE.AxesHelper(1500);
  scene.add(axisHelper);

  //灯光
  let ambientLight = new THREE.AmbientLight(0x4040440);
  scene.add(ambientLight);

  //相机
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 100);
  camera.position.set(3, 1.5, 3);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    canvas: rootDom.value,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xb9d3ff);

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = modelConfig.isAutoRotate;
  controls.autoRotateSpeed = 2;
};

// 动画渲染
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// 修改配置
const handleModelConfig = () => {
  target.scale.set(modelConfig.width, modelConfig.height, modelConfig.depth);
};
onMounted(() => {
  initViewer();
  animate();
});
</script>

<style scoped></style>
