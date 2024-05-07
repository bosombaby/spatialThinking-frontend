<template>
  <div ref="threeDom">
    <canvas id="webgl" ref="rootDom"></canvas>
    <div class="stats" ref="statsDom"></div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import baseTexture from "@/assets/textures/crate.png";

defineOptions({
  name: "BasicDemo"
});

const threeDom = ref(null);
const rootDom = ref(null);
const statsDom = ref(null);

let controls, stats;
let scene, camera, renderer;

const getCanvasSize = () => {
  if (!threeDom.value) return console.error("threeDom is not defined");

  return {
    width: threeDom.value.clientWidth,
    height: threeDom.value.clientHeight
  };
};

const initViewer = () => {
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
    canvas: rootDom.value,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xb9d3ff);

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  //帧率检测
  stats = new Stats();
  stats.dom.style.position = "absolute";
  stats.dom.style.zIndex = "100";
  statsDom.value.appendChild(stats.domElement);
};

// 动画渲染
const animate = () => {
  controls.update();
  stats.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// 自适应屏幕
let onWindowsResize = () => {
  const { width, height } = getCanvasSize();

  console.log("监听屏幕变化", width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
};

//双击全屏
const onWindowsScreen = () => {
  let isFullScreen = document.fullscreenElement;
  if (!isFullScreen) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const expandFunction = () => {
  window.addEventListener("resize", onWindowsResize);
  window.addEventListener("dblclick", onWindowsScreen);
};

onMounted(() => {
  initViewer();
  animate();
  expandFunction();
});
</script>

<style scoped lang="scss">
.stats {
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
