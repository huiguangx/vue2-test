import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import Directives from "./directives";

Vue.directive("reset-fields", {
  inserted(el, binding, vnode) {
    const targetNode = el;
    const componentInstance = vnode.componentInstance;
    if (!componentInstance.model) {
      throw new Error("reset-fields指令只能用于配置了model选项的el-form组件");
    }
    const config = { childList: true };
    // 当观察到变动时执行的回调函数
    const callback = (mutationsList) => {
      console.log(mutationsList);
      if (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            if (mutation.removedNodes.length > 0) {
              // 查出所有被移除的form-item包裹的表单字段名
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
                    bindingValue.push(field);
                  });
                }
              });
              // 重置字段
              if (bindingValue.length > 0) {
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
    console.log(targetNode.classList);
    observer.observe(targetNode, config);
    // 保存观察器实例，用于解绑
    el.mutationOb = observer;
  },
  unbind(el) {
    el.mutationOb.disconnect();
  },
});

Vue.config.productionTip = false;
// Vue.use(Directives);
Vue.use(ElementUI);
Vue.use(Antd);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
