<!--
author:        guang <531311582@qq.com>
date:          2024-02-24 11:56:25
component:     FormLinkage
Copyright © YourCompanyName All rights reserved
-->
<template>
  <div>
    <el-form :model="formData" v-reset-fields label-width="80px">
      <el-form-item label="条件选择" prop="condition">
        <el-select v-model="formData.condition">
          <el-option label="条件A" value="A"></el-option>
          <el-option label="条件B" value="B"></el-option>
        </el-select>
      </el-form-item>
      <!-- 根据条件展示不同的组件 -->
      <el-form-item
        v-if="formData.condition === 'A'"
        label="组件A"
        prop="inputValueA"
      >
        <el-input v-model="formData.inputValueA" />
      </el-form-item>
      <el-form-item v-else label="组件B" prop="inputValueB">
        <el-input v-model="formData.inputValueB" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        conditionA: "",
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
