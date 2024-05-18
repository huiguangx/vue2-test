<!--
author:        guang <531311582@qq.com>
date:          2024-04-14 22:22:02
component:     TableSidebar
Copyright © YourCompanyName All rights reserved
-->
<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :row-key="(record) => record.key"
    :row-class-name="getRowClassName"
    :customRow="rowClick"
    :row-selection="rowSelection"
    :expanded-row-keys.sync="expandedRowKeys"
  >
    <div slot="alarmType" slot-scope="text, record">
      <span> {{ text }}</span>
    </div>
    <!-- 自定义的 action 列 -->
    <template v-slot:action="text, record">
      <a-switch
        v-if="record.isValidation"
        :checked="record.isValidation === 1"
        @change="handleSwitchChange(record)"
      />
      <div style="display: flex; justify-content: center" v-else>
        <a-button @click="recover(record)">修复</a-button>
        <a-button @click="handleLeftDelete(record)">删除</a-button>
      </div>
    </template>
  </a-table>
</template>

<script>
const data = [
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
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  data() {
    return {
      selectedRowKey: null, // 保存被点击行的key
      // data,
      columns: [
        {
          title: "",
          dataIndex: "name",
          key: "name",
          width: "5%",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          width: "60%",
          scopedSlots: { customRender: "alarmType" },
          customCell: this.getRowBackGround,
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
      rowSelection,
      expandedRowKeys: [],
      selectedRowKey: null,
    };
  },
  props: {
    // 声明接收名为 dataSource 的 props
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getRowClassName(record) {
      return record.key === this.selectedRowKey ? "row-clicked" : "";
    },
    rowClick(record, index) {
      return {
        on: {
          click: (event) => {
            // 检查是否点击的是Switch组件，如果不是，则触发样式变更
            if (!event.target.closest(".ant-switch")) {
              this.selectedRowKey = record.key;
              this.$emit("row-clicked", record);
              console.log(record, "子组件"); // 继续子组件内部的逻辑
            }
          },
        },
      };
    },
    //根据条件table中customCell改变单元格样式
    getRowBackGround(record) {
      // console.log("customCell改变单元格样式" + JSON.stringify(recordAlarm))
      console.log("levelid------" + record.levelid);
      switch (
        record.levelid //这里根据条件改变单元格背景色
      ) {
        case "0":
          return { class: "table-color-default" };
        case "1":
          return { class: "table-color-success" };
        case "2":
          return { class: "table-color-processing" };
        case "3":
          return { class: "table-color-warning" };
        case "4":
          return { class: "table-color-error" };
        default:
          return { class: "table-color-default" };
      }
    },
    handleSwitchChange(record) {
      console.log(record, "打印当前行信息");
      record.isValidation = record.isValidation === 1 ? 0 : 1;
    },
    handleLeftDelete(record) {
      // 点击删除按钮时的逻辑，删除第三层的数据行
      this.deleteThirdLevelRow(record, this.data);
    },
    deleteThirdLevelRow(targetRow, data) {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.children && row.children.length > 0) {
          this.deleteThirdLevelRow(targetRow, row.children);
        }
        if (row.key === targetRow.key) {
          // 找到目标行并删除
          const index = data.indexOf(row);
          if (index > -1) {
            data.splice(index, 1);
          }
          return;
        }
      }
    },
    recover(record) {
      // 点击修复按钮时的逻辑，例如恢复当前行数据
      console.log(record, "打印当前行信息");
      record.levelid = 1;
    },
  },
};
</script>

<style>
.table-color-success {
  /* color: #ffffff; */
  border: 1px solid #ccc;
  background-color: #0c8fcf;
}

.table-color-processing {
  border: 1px solid #ccc;
  background-color: #ffff00;
}

.table-color-warning {
  background-color: #ffa500;
}

.table-color-error {
  border: 1px solid #ccc;
  background-color: #ff0000;
}

.table-color-default {
  background-color: #ffffff;
}
/* 新添加的点击行样式 */
/* 行点击样式，只添加外部边框，不适用于单元格 */
.row-clicked td {
  background-color: #add8e6 !important;
}
/* 第一个td的左边框和圆角 */
.row-clicked > td:first-child {
  border-left: 1px solid #3a8ee6 !important;
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
}

/* 中间td的上下边框 */
.row-clicked > td {
  border-top: 1px solid #3a8ee6 !important;
  border-bottom: 1px solid #3a8ee6 !important;
}

/* 最后一个td的右边框和圆角 */
.row-clicked > td:last-child {
  border-right: 1px solid #3a8ee6 !important;
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
}

/* 重置antd默认的行边框，使得本应用行边框更加突出 */
</style>
