<template>
  <div class="three-box">
    <canvas id="webgl"></canvas>
    <ul id="content">
      <li
        v-for="(item, index) in geometryList"
        class="flex flex-col gap-y-2 justify-between w-[15rem] h-[15rem] ty-card"
      >
        <div
          id="model-show"
          class="w-full flex-1 border border-indigo-400"
        ></div>
        <div class="flex-bc">
          <span>{{ item.title }} </span>
          <el-button type="primary" @click="goDetail(item)">查看</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { geometryList } from "./config";

const router = useRouter();
defineOptions({
  name: "LearnGeometry"
});

// 初始化场景
let renderer,
  canvas,
  content,
  models,
  scenes = [];

const initViewer = () => {
  canvas = document.querySelector("#webgl");
  content = document.querySelector("#content");
  models = document.querySelectorAll("#model-show");

  models.forEach((element, index) => {
    // 单个场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.set(2, 1.5, 2);
    scene.userData.element = element;
    scene.userData.camera = camera;
    camera.lookAt(scene.position);

    // 控制器
    const controls = new OrbitControls(
      scene.userData.camera,
      scene.userData.element
    );
    controls.minDistance = 1;
    controls.maxDistance = 5;
    // controls.enablePan = false;
    // controls.enableZoom = false;

    scene.userData.controls = controls;

    // 模型
    const geometry = geometryList[index].geometry;
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
      roughness: 0.5,
      metalness: 0,
      flatShading: true,
      wireframe: false,
      side: THREE.DoubleSide
    });
    scene.add(new THREE.Mesh(geometry, material));

    // 灯光设置
    const ambientLight = new THREE.AmbientLight(0xfffff, 0.5); // soft white light
    scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directLight.position.set(1, 1, 1);
    scene.add(directLight);

    // 半球光
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0xffffff, 0.8));

    scenes.push(scene);
  });

  // 渲染器
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
};

const updateSize = () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
  }
};

const autoSpeed = 0.001;
const render = () => {
  updateSize();
  canvas.style.transform = `translateY(${window.scrollY}px)`;
  // 渲染器颜色、部分剪裁
  renderer.setClearColor(0xf0f2f5);
  renderer.setScissorTest(false);
  renderer.clear();

  renderer.setClearColor(0xe0e0e0);
  renderer.setScissorTest(true);
  scenes.forEach(scene => {
    // TODO: 旋转样式
    scene.children[0].rotation.y = Date.now() * autoSpeed;

    const element = scene.userData.element;

    // 确定裁剪的位置
    const parent = content.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    if (
      rect.rigth < 0 ||
      rect.bottom < 0 ||
      rect.left > renderer.domElement.clientWidth ||
      rect.top > renderer.domElement.clientHeight
    ) {
      return;
    }
    // 确定视口
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const left = element.offsetLeft;
    const bottom = renderer.domElement.clientHeight - rect.bottom + parent.top;

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);

    const camera = scene.userData.camera;
    renderer.render(scene, camera);
  });
};

// 动画渲染
const animate = () => {
  render();
  requestAnimationFrame(animate);
};

// 查看详情
const goDetail = item => {
  router.push({
    name: "OperateGeometryNew",
    query: {
      type: item.name
    }
  });
};

onMounted(() => {
  initViewer();
  animate();
});
</script>

<style scoped lang="scss">
#webgl {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

#content {
  position: relative;
  top: 0;
  width: 100%;
  padding: 0 1.5rem;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}
</style>
