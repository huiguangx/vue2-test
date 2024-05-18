<!--
author:        guang <531311582@qq.com>
date:          2024-04-14 23:26:41
component:     MainComponent
Copyright © YourCompanyName All rights reserved
-->
<template>
  <a-row :gutter="16">
    <a-col :span="8">
      <div>
        <!-- 搜索表单 -->
        <a-form layout="inline">
          <a-form-item>
            <a-input
              placeholder="Search by name"
              v-model="searchName"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input placeholder="Search by age" v-model="searchAge"></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSearch">Search</a-button>
          </a-form-item>
        </a-form>
        <!-- 子组件 -->
        <TableSidebar :data="childData" @row-clicked="handleRowClicked" />
      </div>
    </a-col>
    <a-col :span="16">
      <!-- 右侧表格 -->
      <a-table :columns="columns" :data-source="filteredData"></a-table>
    </a-col>
  </a-row>
</template>

<script>
// 导入子组件
import TableSidebar from "./TableSidebar.vue";

export default {
  components: {
    TableSidebar,
  },
  data() {
    return {
      childData: [
        {
          key: 1,
          name: "",
          age: 60,
          levelid: "1",
          isValidation: 1,
          children: [
            {
              key: 11,
              name: "",
              age: 42,
              isValidation: 1,
            },
            {
              key: 12,
              levelid: "2",
              name: "",
              age: 30,
              isValidation: 1,
              children: [
                {
                  key: 121,
                  name: "",
                  age: 16,
                  levelid: "4",
                },
              ],
            },
            {
              key: 13,
              name: "",
              age: 72,
              isValidation: 1,
              children: [
                {
                  key: 131,
                  name: "",
                  age: 42,
                  isValidation: 1,
                  children: [
                    {
                      key: 1311,
                      name: "",
                      age: 25,
                      address: "",
                      levelid: "4",
                    },
                    {
                      key: 1312,
                      name: "",
                      age: 18,
                      levelid: "4",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 2,
          name: "",
          age: 32,
          isValidation: 1,
        },
      ],
      searchName: "", // 搜索条件
      searchAge: "", // 搜索条件
      // 右侧表格的数据和列配置...
      columns: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Address", dataIndex: "address", key: "address" },
        // 新加的列
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    handleRowClicked(record) {
      // 处理行点击事件
      // 可以用record更新右侧表格的搜索条件
      console.log(record, "父组件");
    },
    // 其他方法...
  },
  computed: {
    filteredData() {
      // 根据搜索条件计算右侧表格的数据
    },
  },
};
</script>

<style>
/* ... */
</style>
