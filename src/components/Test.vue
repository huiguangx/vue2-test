<!--
author:        guang <531311582@qq.com>
date:          2024-04-11 23:07:18
component:     Test
Copyright © YourCompanyName All rights reserved
-->
<script>
  //  <a-tree v-if="dataTemp.length" :checked-keys="checkedKeys" checkable :expanded-keys="expandedKeys"
  //           :auto-expand-parent="autoExpandParent" :tree-data="dataTemp" @expand="onExpand" @check="handleCheck" />
// 更新选中的键列表，确保父节点和祖父节点的选择状态与子节点一致
    updateCheckedKeys(node, checkedKeys) {
      // 如果当前节点有父节点
      if (node.$vnode.data.props.parentId) {
        // 从选中的键列表中移除父节点的键
        checkedKeys = checkedKeys.filter(item => item !== node.$vnode.data.props.parentId);
        // 如果当前节点的父节点是根节点
        if (node.$vnode.data.props.parentId === '0') {
          // 从选中的键列表中移除当前节点的键
          checkedKeys = checkedKeys.filter(item => item !== node.$vnode.key);
        }
      }
      // 递归处理祖父节点的选择
      let parentNode = node;
      while (parentNode && parentNode.$vnode.data.props.parentId) {
        checkedKeys = checkedKeys.filter(item => item !== parentNode.$vnode.data.props.parentId);
        parentNode = parentNode.$parent; // 访问父节点
      }
      // if (node.children && node.children.length > 0) {
      //   for (const childNode of node.children) {
      //     updateCheckedKeys(childNode, checkedKeys);
      //   }
      // }
      return checkedKeys;
    },
    handleCheck(checkedKeys, e) {
      const { checked, node, checkedNodes, halfCheckedKeys } = e;
      let tmpCheckedKeys = this.trulyCheckedKeys
      // 搜索情况下
      if(this.isSearching) {
        if (checkedKeys.length > this.checkedKeys.length) {
          const container = JSON.parse(JSON.stringify(this.trulyCheckedKeys));
          if(checked && node.$vnode.data.props.parentId) {
            // checkedKeys = checkedKeys.filter(item => item !== node.$vnode.data.props.parentId)
            // if(node.$vnode.data.props.parentId == '0') {
            //   checkedKeys = checkedKeys.filter(item => item !== node.$vnode.key)
            // }
            checkedKeys = this.updateCheckedKeys(node, checkedKeys);
          }
          container.push(...checkedKeys);
          this.trulyCheckedKeys = [... new Set(container)];
          tmpCheckedKeys = [...this.trulyCheckedKeys]
        } else {
          if(!checked && checkedKeys.length === 0) {
            // 如果是反选，保留 those not in dataTemp
            checkedKeys = tmpCheckedKeys.filter(key => 
              !this.isKeyInTree(this.dataTemp, key)
            );
            console.log(checkedKeys, '77777')
          }
          this.trulyCheckedKeys = checkedKeys;
        }
      } else {// 正常情况下
        if (checkedKeys.length > this.checkedKeys.length) {
          const container = JSON.parse(JSON.stringify(this.trulyCheckedKeys));
          container.push(...checkedKeys);
          this.trulyCheckedKeys = [... new Set(container)];
        } else {
          this.trulyCheckedKeys = checkedKeys;
        }
        this.checkedKeys = checkedKeys;
      }
      this.checkedKeys = checkedKeys;
      // this.CheckedKeys = this.trulyCheckedKeys;
    },
    // 辅助函数，用于检查键是否存在于树中
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
    },</script>