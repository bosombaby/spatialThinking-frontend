<template>
  <div class="flex-bc gap-x-4">
    <canvas class="w-4/5 h-full" ref="rootDom"></canvas>
    <div
      class="flex-1 h-full shadow rounded-md bg-white flex flex-col items-center"
    >
      <div class="font-bold mt-4">操作栏</div>
      <div class="text-sm pl-4 my-4">
        操作说明：鼠标移动显示物体，左键添加，右键删除
      </div>
      <div class="flex flex-col gap-y-2">
        <el-button
          type="primary"
          @click="
            () => {
              camera.position.set(800, 100, 0);
            }
          "
          >正视图</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              camera.position.set(0, 100, 800);
            }
          "
          >侧视图</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              camera.position.set(0, 800, 0);
            }
          "
          >顶视图</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import baseTexture from "@/assets/textures/square-outline-textured.png";

defineOptions({
  name: "SwitchViews"
});
const rootDom = ref(null);

let scene, camera, renderer, controls;
let plane;
let pointer,
  raycaster,
  isDropCube = false;

let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
const objects = [];

const getCanvasSize = () => {
  if (!rootDom.value) return console.error("rootDom is not defined");

  return {
    width: rootDom.value.clientWidth,
    height: rootDom.value.clientHeight
  };
};

const initViewer = () => {
  const { width, height } = getCanvasSize();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(500, 800, 1300);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // roll-over helpers
  const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
  rollOverMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    opacity: 0.5,
    transparent: true
  });
  rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
  scene.add(rollOverMesh);

  // cubes

  const map = new THREE.TextureLoader().load(baseTexture);
  map.colorSpace = THREE.SRGBColorSpace;
  cubeGeo = new THREE.BoxGeometry(50, 50, 50);
  cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xfeb74c, map: map });

  const gridHelper = new THREE.GridHelper(1000, 20);
  scene.add(gridHelper);

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  const geometry = new THREE.PlaneGeometry(1000, 1000);
  geometry.rotateX(-Math.PI / 2);

  plane = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ visible: false })
  );
  scene.add(plane);

  objects.push(plane);

  // lights

  const ambientLight = new THREE.AmbientLight(0x606060, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(1, 0.75, 0.5).normalize();
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer({
    canvas: rootDom.value,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
};

// 动画渲染
const animate = () => {
  controls.update();
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

function onPointerMove(event) {
  const { width, height } = getCanvasSize();
  pointer.set(
    (event.offsetX / width) * 2 - 1,
    -(event.offsetY / height) * 2 + 1
  );

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(objects, false);
  if (intersects.length > 0) {
    const intersect = intersects[0];

    rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    rollOverMesh.position
      .divideScalar(50)
      .floor()
      .multiplyScalar(50)
      .addScalar(25);

    animate();
  }
}

function onMouseLeftClick(event) {
  const { width, height } = getCanvasSize();
  pointer.set(
    (event.offsetX / width) * 2 - 1,
    -(event.offsetY / height) * 2 + 1
  );

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(objects, false);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
    voxel.position.copy(intersect.point).add(intersect.face.normal);
    voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    scene.add(voxel);

    objects.push(voxel);
  }

  animate();
}

function onMouseRightClick(event) {
  const { width, height } = getCanvasSize();
  pointer.set(
    (event.offsetX / width) * 2 - 1,
    -(event.offsetY / height) * 2 + 1
  );

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(objects, false);

  if (intersects.length > 0 && intersects[0].object !== plane) {
    scene.remove(intersects[0].object);
    objects.splice(objects.indexOf(intersects[0].object), 1);
  }

  animate();
}

// 鼠标操作
const onDocumentOperate = () => {
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("click", onMouseLeftClick);
  document.addEventListener("contextmenu", onMouseRightClick);
};

onMounted(() => {
  initViewer();
  animate();
  expandFunction();
  onDocumentOperate();
});
</script>
