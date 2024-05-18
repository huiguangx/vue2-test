/**
 * @author        guang <531311582@qq.com>
 * @date          2024-05-18 11:41:59
 * Copyright © YourCompanyName All rights reserved
 */
const throttle = (fn, delay) => {
  let preTime = 0;
  return (...args) => {
    let curTime = Data.now();
    if (curTime - preTime >= delay) {
      preTime = curTime;
      fn(...args);
    }
  };
};
const dd = 44;
