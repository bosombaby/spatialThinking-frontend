<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import baseTexture from "@/assets/textures/crate.png";

defineOptions({
  name: "BasicDemo"
});

const rootDom = ref(null);

let controls, stats;
let scene, camera, renderer;

let getCanvasSize = () => {
  return {
    width: rootDom.value.clientWidth,
    height: rootDom.value.clientHeight
  };
};

let initViewer = () => {
  const { width, height } = getCanvasSize();

  scene = new THREE.Scene();

  // 物体
  let geometry = new THREE.BoxGeometry(100, 100, 100);
  let texture = new THREE.TextureLoader().load(baseTexture);
  let material = new THREE.MeshBasicMaterial({ map: texture });
  let cube = new THREE.Mesh(geometry, material);
  cube.rotation.x = Math.PI / 9;
  scene.add(cube);

  //坐标轴
  let axisHelper = new THREE.AxesHelper(1500);
  scene.add(axisHelper);

  //导航网格
  let gridHelper = new THREE.GridHelper(100, 200);
  // scene.add(gridHelper);

  //灯光
  let ambientLight = new THREE.AmbientLight(0x4040440);
  scene.add(ambientLight);

  //相机
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 100, 400);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xb9d3ff);
  rootDom.value.appendChild(renderer.domElement);

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  //帧率检测
  stats = new Stats();
  stats.dom.style.position = "absolute";
  stats.dom.style.zIndex = "100";
  rootDom.value.appendChild(stats.domElement);
};

// 动画渲染
let animate = () => {
  controls.update();
  stats.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// 自适应屏幕
let onWindowsResize = () => {
  const { width, height } = getCanvasSize();

  console.log(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
};

//双击全屏
let onWindowsScreen = () => {
  let isFullScreen = document.fullscreenElement;
  if (!isFullScreen) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// TODO: 监听窗口变化，节流操作
let expandFunction = () => {
  window.addEventListener("resize", onWindowsResize);
  window.addEventListener("dblclick", onWindowsScreen);
};

onMounted(() => {
  initViewer();
  animate();
  expandFunction();
});
</script>

<template>
  <div ref="rootDom" class="three-box" />
</template>

<style scoped lang="scss">
.three-box {
  // min-width: 80%;
  height: 82vh;
}
</style>
