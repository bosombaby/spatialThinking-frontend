import * as THREE from "three";

const geometryList = [
  { title: "立方缓冲几何体", geometry: new THREE.BoxGeometry(1, 1, 1) },
  { title: "胶囊几何体", geometry: new THREE.CapsuleGeometry(0.5, 0.5, 4, 8) },
  { title: "圆形缓冲几何体", geometry: new THREE.CircleGeometry(1, 32) }
];

export { geometryList };
