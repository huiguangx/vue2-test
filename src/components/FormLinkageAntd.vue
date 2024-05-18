<!--
author:        guang <531311582@qq.com>
date:          2024-02-24 14:54:29
component:     FormLinkageAntd
Copyright © YourCompanyName All rights reserved
-->
<template>
  <a-form :model="formData" labelCol="{ span: 4 }" wrapperCol="{ span: 14 }">
    <a-form-item label="条件选择">
      <a-select v-model="formData.condition" @change="handleConditionChange">
        <a-select-option label="条件A" value="A">条件A</a-select-option>
        <a-select-option label="条件B" value="B">条件B</a-select-option>
      </a-select>
    </a-form-item>
    <!-- 根据条件展示不同的组件 -->
    <a-form-item v-if="formData.condition === 'A'" label="组件A">
      <a-input v-model="formData.inputValueA" />
    </a-form-item>
    <a-form-item v-else label="组件B">
      <a-input v-model="formData.inputValueB" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        condition: "", // Changed from conditionA to condition to match your template logic
        inputValueA: "",
        inputValueB: "",
      },
    };
  },
  methods: {
    handleConditionChange() {
      this.formData.inputValueA = "";
      this.formData.inputValueB = "";
    },
  },
};
</script>
