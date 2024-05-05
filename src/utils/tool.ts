// 深拷贝
const deepClone = (target: any, map = new WeakMap()) => {
  if (typeof target !== "object" || target === null) return target;

  if (map.get(target)) return map.get(target);

  const constructor = target.constructor;
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
    return new constructor(target);

  const cloneTarget = Array.isArray(target) ? [] : {};
  map.set(target, cloneTarget);

  for (const key of Object.keys(target)) {
    // @ts-ignore
    cloneTarget[key] = deepClone(target[key], map);
  }
  return cloneTarget;
};

// 防抖
let timer: NodeJS.Timeout | null = null;
function debounce(fn: any, delay: number, immediate: boolean) {
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;

    if (timer) clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}

// 节流
function throttle(fn: any, delay: number) {
  let preTime = 0;

  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;

    const nowTime = +new Date();
    if (nowTime - preTime >= delay) {
      fn.apply(context, args);

      preTime = nowTime;
    }
  };
}

export { deepClone, debounce, throttle };
