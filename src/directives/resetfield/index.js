/**
 * @author        guang <531311582@qq.com>
 * @date          2024-02-24 15:06:52
 * Copyright © YourCompanyName All rights reserved
 */
const resetField = {
  inserted(el, binding, vnode) {
    console.log(el);
    const targetNode = el;
    const componentInstance = vnode.componentInstance;
    if (!componentInstance.model) {
      throw new Error("reset-fields指令只能用于配置了model选项的el-form组件");
    }
    const config = {
      attributes: true, // 监听属性变化
      childList: true, // 监听子节点变化
      //   characterData: true, // 监听文本内容变化
      subtree: true, // 监听后代节点变化
    };
    // 当观察到变动时执行的回调函数
    const callback = (mutationsList) => {
      console.log(666);
      if (mutationsList) {
        console.log(777, mutationsList);
        for (const mutation of mutationsList) {
          console.log(mutation, "mutation");
          if (mutation.type === "childList") {
            if (mutation.removedNodes.length > 0) {
              // 查出所有被移除的form-item包裹的表单字段名
              console.log(mutation.removedNodes.length);
              const bindingValue = [];
              mutation.removedNodes.forEach((item) => {
                let formItemEls = null;
                if (item.classList && item.classList.contains("el-form-item")) {
                  formItemEls = [item];
                } else if (item.querySelectorAll) {
                  formItemEls = item.querySelectorAll(".el-form-item");
                }
                if (formItemEls) {
                  formItemEls.forEach((formItemEl) => {
                    const field = formItemEl
                      .querySelector("label")
                      .getAttribute("for");
                    console.log(field);
                    bindingValue.push(field);
                  });
                }
              });
              // 重置字段
              if (bindingValue.length > 0) {
                console.log(bindingValue);
                const model = componentInstance.model;
                bindingValue.forEach((field) => {
                  if (Array.isArray(model[field])) {
                    model[field] = [];
                  } else {
                    model[field] = undefined;
                  }
                });
              }
            }
          }
        }
      }
    };
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);
    // 保存观察器实例，用于解绑
    el.mutationOb = observer;
  },
  unbind(el) {
    el.mutationOb.disconnect();
  },
};

export default resetField;
