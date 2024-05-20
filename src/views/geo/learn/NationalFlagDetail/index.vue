<template>
  <div class="flex-bc gap-x-4">
    <canvas class="w-2/3 h-full" ref="rootDom"></canvas>
    <div
      class="flex-1 h-full shadow rounded-md bg-white flex flex-col items-center"
    >
      <div class="font-bold my-4">国旗介绍</div>
      <div class="flex flex-col gap-y-2 pl-4 indent-4 text-gray-500">
        中国国旗由红色底面和五颗黄色五角星组成。红色象征着革命，黄色五角星象征着中国共产党领导下的各族人民大团结。国旗上的五颗星中，一颗较大的星代表中国共产党，四颗较小的星环绕在大星的右侧，代表工人阶级、农民阶级、城市小资产阶级和民族资产阶级，这四个社会阶级在中国共产党的领导下团结起来。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import baseTexture from "@/assets/flag/1024.png";

defineOptions({
  name: "NationalFlagDetail"
});

const rootDom = ref(null);
let scene, camera, renderer, controls;

const getCanvasSize = () => {
  if (!rootDom.value) return console.error("rootDom is not defined");

  return {
    width: rootDom.value.clientWidth,
    height: rootDom.value.clientHeight
  };
};

const initViewer = () => {
  const { width, height } = getCanvasSize();
  scene = new THREE.Scene();

  //灯光
  let ambientLight = new THREE.AmbientLight(0x4040440);
  scene.add(ambientLight);

  //相机
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 3, 10);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    canvas: rootDom.value,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
};

// 生成国旗
const texture = new THREE.TextureLoader().load(baseTexture);
const vertexShader = `
        uniform vec2 uFrequency;
        uniform float uTime;

        varying  vec2 vUv;
        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.z += sin(modelPosition.x + uFrequency.x - uTime) * 0.8;
            modelPosition.z += cos(modelPosition.y + uFrequency.y - uTime) * 0.2;

            vUv=uv;

            vec4 viewPosition = viewMatrix * modelPosition;


            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
        }
        `;
const fragmentShader = `

        varying vec2 vUv;

        uniform sampler2D uTexture;

        void main()
        {
            vec4 textureColor = texture2D(uTexture,vUv);
            gl_FragColor = textureColor ;
        }
        `;
let flag = null;
const generateFlag = () => {
  const geometry = new THREE.PlaneGeometry(6, 4, 32, 32);
  // const material = new THREE.MeshBasicMaterial({
  //   map: texture,
  //   side: THREE.DoubleSide
  // });
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(5, 2)
      },
      uTime: { value: 0 },
      uTexture: { value: texture }
    },
    wireframe: false,
    side: THREE.DoubleSide,
    transparent: true
  });

  flag = new THREE.Mesh(geometry, material);
  scene.add(flag);
  console.log(scene);
};

// TODO：调整样式

const strength = { value: 2 };

// 动画渲染
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  flag.material.uniforms.uTime.value = elapsedTime * strength.value;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

onMounted(() => {
  initViewer();
  generateFlag();
  animate();
});
</script>

<style lang="scss" scoped></style>
