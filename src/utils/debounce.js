/**
 * @author        guang <531311582@qq.com>
 * @date          2024-05-18 11:35:05
 * Copyright © YourCompanyName All rights reserved
 */
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const a = 1;
