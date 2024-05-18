/**
 * @author        guang <531311582@qq.com>
 * @date          2024-02-24 15:06:43
 * Copyright © YourCompanyName All rights reserved
 */
import resetField from "./resetfield";

const directives = {
  resetField,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((item) => {
      Vue.directive(item, directives[item]);
    });
  },
};
