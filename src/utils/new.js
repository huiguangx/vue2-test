/**
 * @author        guang <531311582@qq.com>
 * @date          2024-05-18 15:12:02
 * Copyright © YourCompanyName All rights reserved
 */
const _new = (Fn, ...args) => {
  const obj = Object.create(Fn.prototype);
  const res = Fn.apply(obj, args);
  return res instanceof Object ? res : obj;
};
const cc = 33;
