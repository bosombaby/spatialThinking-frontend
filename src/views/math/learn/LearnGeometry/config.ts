import * as THREE from "three";

const x = 0,
  y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

class CustomSinCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();

    this.scale = scale;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

const path = new CustomSinCurve(10);

const geometryList = [
  {
    title: "平面缓冲几何体",
    name: "PlaneGeometry",
    geometry: new THREE.PlaneGeometry(1, 1)
  },
  {
    title: "圆形缓冲几何体",
    name: "CircleGeometry",
    geometry: new THREE.CircleGeometry(1, 32)
  },
  {
    title: "圆环缓冲几何体",
    name: "RingGeometry",
    geometry: new THREE.RingGeometry(0.5, 1, 32)
  },
  {
    title: "立方缓冲几何体",
    name: "BoxGeometry",
    geometry: new THREE.BoxGeometry(1, 1, 1),
    basicConfig: {
      width: { value: 1, label: "宽度" },
      height: { value: 1, label: "高度" },
      depth: { value: 1, label: "深度" }
    },
    segments: {
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1
    }
  },
  {
    title: "圆锥缓冲几何体",
    name: "ConeGeometry",
    geometry: new THREE.ConeGeometry(1, 1, 32)
  },
  {
    title: "圆柱缓冲几何体",
    name: "CylinderGeometry",
    geometry: new THREE.CylinderGeometry(1, 1, 1, 32)
  },

  {
    title: "球缓冲几何体",
    name: "SphereGeometry",
    geometry: new THREE.SphereGeometry(1, 32, 32)
  },
  {
    title: "四面缓冲几何体",
    name: "TetrahedronGeometry",
    geometry: new THREE.TetrahedronGeometry(1)
  },
  {
    title: "八面缓冲几何体",
    name: "OctahedronGeometry",
    geometry: new THREE.OctahedronGeometry(1)
  },
  {
    title: "二十面缓冲几何体",
    name: "IcosahedronGeometry",
    geometry: new THREE.IcosahedronGeometry(1)
  },
  {
    title: "胶囊几何体",
    name: "CapsuleGeometry",
    geometry: new THREE.CapsuleGeometry(0.5, 0.5, 4, 8)
  },
  {
    title: "挤压缓冲几何体",
    name: "ExtrudeGeometry",
    geometry: new THREE.ExtrudeGeometry(
      new THREE.Shape([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 1)
      ]),
      {
        depth: 1,
        bevelEnabled: false
      }
    )
  },
  {
    title: "车削缓冲几何体",
    name: "LatheGeometry",
    geometry: new THREE.LatheGeometry([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(2, 2)
    ])
  },

  {
    title: "形状缓冲几何体",
    name: "ShapeGeometry",
    geometry: new THREE.ShapeGeometry(heartShape)
  },
  {
    title: "圆环缓冲几何体",
    name: "TorusGeometry",
    geometry: new THREE.TorusGeometry(1, 0.4, 16, 100)
  },
  {
    title: "圆环缓冲扭结几何体",
    name: "TorusKnotGeometry",
    geometry: new THREE.TorusKnotGeometry(1, 0.4, 64, 8)
  },
  {
    title: "管道缓冲几何体",
    name: "TubeGeometry",
    geometry: new THREE.TubeGeometry(path, 20, 2, 8, false)
  }
];

export { geometryList };
