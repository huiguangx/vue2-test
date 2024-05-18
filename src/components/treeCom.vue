<!--
author:        guang <531311582@qq.com>
date:          2024-04-11 23:02:09
component:     treeCom
Copyright © YourCompanyName All rights reserved
-->
<template>
  <div>
    <a-input-search
      v-model="searchValue"
      @search="onSearch"
      placeholder="搜索..."
    />
    <a-tree
      :tree-data="filteredData"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      checkable
      :checked-keys="checkedKeys"
      @check="onCheck"
      @expand="onExpand"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      trulyCheckedKeys: [], // 真正选中的节点，不受搜索影响
      searchValue: "",
      treeData: [
        {
          title: "Root Node",
          key: "0",
          parentId: "0",
          children: [
            {
              title: "第一层节点1",
              key: "0-3",
              parentId: "0",
              children: [
                {
                  title: "第二层节点1",
                  key: "0-3-0",
                  parentId: "0-3",
                  children: [
                    {
                      title: "第三层节点1",
                      key: "0-3-0-0",
                      parentId: "0-3-0",
                      children: [
                        {
                          title: "第四层节点1",
                          parentId: "0-3-0-0",
                          key: "0-3-0-0-0",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Parent Node 1",
              key: "0-0",
              parentId: "0",
              children: [
                {
                  title: "Leaf Node 1",
                  parentId: "0-0",
                  key: "0-0-0",
                  children: [
                    {
                      title: "Sub Leaf Node 1",
                      key: "0-0-0-0",
                      parentId: "0-0-0",
                    },
                    {
                      title: "Sub Leaf Node 2",
                      parentId: "0-0-0",
                      key: "0-0-0-1",
                    },
                  ],
                },
                {
                  title: "Leaf Node 2",
                  parentId: "0-0-0",
                  key: "0-0-1",
                  children: [
                    {
                      title: "Sub Leaf Node 3",
                      parentId: "0-0-1",
                      key: "0-0-1-0",
                    },
                    {
                      title: "Sub Leaf Node 4",
                      parentId: "0-0-1",
                      key: "0-0-1-1",
                    },
                  ],
                },
              ],
            },
            {
              title: "Parent Node 2",
              key: "0-1",
              parentId: "0",
              children: [
                {
                  title: "Leaf Node 3",
                  parentId: "0-1",
                  key: "0-1-0",
                  children: [
                    {
                      title: "Sub Leaf Node 5",
                      parentId: "0-1-0",
                      key: "0-1-0-0",
                    },
                    {
                      title: "Sub Leaf Node 6",
                      parentId: "0-1-0",
                      key: "0-1-0-1",
                    },
                  ],
                },
                {
                  title: "Leaf Node 4",
                  parentId: "0-1",
                  key: "0-1-1",
                  children: [
                    {
                      title: "Sub Leaf Node 7",
                      parentId: "0-1-1",
                      key: "0-1-1-0",
                    },
                    {
                      title: "Sub Leaf Node 8",
                      parentId: "0-1-1",
                      key: "0-1-1-1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      filteredData: [], // 筛选后的树状数据
      expandedKeys: [], // 展开的节点
      autoExpandParent: true,
      checkedKeys: [], // 选中的节点
      isSearching: false,
    };
  },
  methods: {
    // 搜索逻辑
    onSearch(value) {
      if (!value) {
        this.isSearching = false;
        console.log(this.isSearching, 1);
        this.filteredData = this.treeData;
        // 清空搜索时，重置checkedKeys为trulyCheckedKeys
        this.checkedKeys = [...this.trulyCheckedKeys];
      } else {
        this.isSearching = true;
        console.log(this.isSearching, 2);
        // 筛选树状数据的逻辑
        this.filteredData = this.filterTree(this.treeData, value);
        this.checkedKeys = [...this.trulyCheckedKeys];
      }
      this.expandedKeys = this.filteredData.map((node) => node.key);
      this.autoExpandParent = true;
    },
    // 筛选树的函数
    filterTree(data, value) {
      let result = [];
      data.forEach((item) => {
        if (item.title.includes(value)) {
          result.push({ ...item });
        } else if (item.children) {
          const children = this.filterTree(item.children, value);
          if (children.length) {
            result.push({ ...item, children });
          }
        }
      });
      return result;
    },
    // 选中和反选的逻辑
    onCheck(checkedKeys, e) {
      const { checked, node, checkedNodes, halfCheckedKeys } = e;
      let tmpCheckedKeys = this.trulyCheckedKeys;
      // 搜索情况下
      if (this.isSearching) {
        if (checked) {
          if (checked && node.$vnode.data.props.parentId) {
            checkedKeys = this.updateCheckedKeys(node, checkedKeys);
          }
          tmpCheckedKeys.push(...checkedKeys);
          this.trulyCheckedKeys = [...new Set(tmpCheckedKeys)];
          console.log(tmpCheckedKeys, "搜索状态正选-----------");
          this.checkedKeys = this.trulyCheckedKeys;
        } else {
          if (!checked) {
            // 如果是反选，保留 those not in dataTemp
            console.log(tmpCheckedKeys, this.filteredData, "搜索状态下反选前");
            checkedKeys = tmpCheckedKeys.filter(
              (key) =>
                !this.isKeyInTree(this.filteredData, key) ||
                checkedKeys.includes(key)
            );
            console.log(checkedKeys, "搜索状态反选");
          }
          this.trulyCheckedKeys = checkedKeys;
          this.checkedKeys = this.trulyCheckedKeys;
        }
      } else {
        // 正常情况下
        if (checkedKeys.length > this.checkedKeys.length) {
          const container = JSON.parse(JSON.stringify(this.trulyCheckedKeys));
          container.push(...checkedKeys);
          this.trulyCheckedKeys = [...new Set(container)];
        } else {
          this.trulyCheckedKeys = checkedKeys;
        }
        console.log("非搜索状态", checkedKeys);
        this.checkedKeys = checkedKeys;
      }
    },
    isKeyInTree(tree, key) {
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.key === key) {
          return true;
        }
        // 如果当前节点有子节点，递归检查子节点
        if (node.children && this.isKeyInTree(node.children, key)) {
          return true;
        }
      }
      return false;
    },
    // 展开节点时的逻辑
    onExpand(expandedKeysValue) {
      this.expandedKeys = expandedKeysValue;
      this.autoExpandParent = false;
    },
    updateCheckedKeys(node, checkedKeys) {
      // 如果当前节点有父节点
      if (node.$vnode.data.props.parentId) {
        console.log("露出半个龟头");
        // 从选中的键列表中移除父节点的键
        checkedKeys = checkedKeys.filter(
          (item) => item !== node.$vnode.data.props.parentId
        );
        // 如果当前节点的父节点是根节点
        if (node.$vnode.data.props.parentId === "0") {
          // 从选中的键列表中移除当前节点的键
          checkedKeys = checkedKeys.filter((item) => item !== node.$vnode.key);
        }
      }
      // 递归处理祖父节点的选择
      let parentNode = node;
      while (parentNode && parentNode.$vnode.data.props.parentId) {
        checkedKeys = checkedKeys.filter(
          (item) => item !== parentNode.$vnode.data.props.parentId
        );
        parentNode = parentNode.$parent; // 访问父节点
      }
      // if (node.children && node.children.length > 0) {
      //   for (const childNode of node.children) {
      //     updateCheckedKeys(childNode, checkedKeys);
      //   }
      // }
      return checkedKeys;
    },
  },

  mounted() {
    // 加载树状数据
    // this.treeData = this.getTreeData();
    this.filteredData = this.treeData;
  },
  // 获取树状数据的函数
  getTreeData() {
    // 此处应该是从后端获取数据或者是定义的静态数据
    return [
      // 树状数据结构示例
    ];
  },
};
</script>
