<template>
  <a-select
    v-model="value"
    style="width: 100%"
    placeholder="select one country"
    option-label-prop="label"
  >
    <a-select-option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :label="option.label"
    >
      <!-- <span :role="option.role" :aria-label="option.label">
        {{ option.icon }}
      </span> -->
      {{ option.text }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  data() {
    return {
      value: null, // 如果不需要默认选中项，可以设为 null
      options: [
        // 定义一个options数组包含所有选择项的数据
        {
          value: "china",
          label: "China",
          icon: "🇨🇳",
          text: "China (中国)",
          role: "img",
          ariaLabel: "China",
        },
        {
          value: "usa",
          label: "USA",
          icon: "🇺🇸",
          text: "USA (美国)",
          role: "img",
          ariaLabel: "USA",
        },
        {
          value: "japan",
          label: "Japan",
          icon: "🇯🇵",
          text: "Japan (日本)",
          role: "img",
          ariaLabel: "Japan",
        },
        {
          value: "korea",
          label: "Korea",
          icon: "🇰🇷",
          text: "Korea (韩国)",
          role: "img",
          ariaLabel: "Korea",
        },
      ],
    };
  },
  watch: {
    value(val) {
      console.log(`selected:`, val);
    },
  },
};
</script>
