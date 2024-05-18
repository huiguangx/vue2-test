<template>
  <a-table
    :columns="columns"
    :data-source="data"
    class="components-table-demo-nested"
  >
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <a slot="operation" slot-scope="text">Publish</a>
    <a-table
      slot="expandedRowRender"
      slot-scope="text"
      :columns="innerColumns"
      :data-source="innerData"
      :pagination="false"
    >
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        {{ selectedKeys }}
        <!-- <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        >
        </a-input> -->
        <a-select
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          style="width: 188px; margin-bottom: 8px; display: block"
          :value="selectedKeys[0]"
          @change="(value) => setSelectedKeys(value ? [value] : [])"
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        >
          <a-select-option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
          >
            {{ option.value }}
          </a-select-option>
        </a-select>

        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <span slot="status" slot-scope="text">
        <a-badge status="success" />Finished
      </span>
      <span slot="operation" slot-scope="text" class="table-operation">
        <a>Pause</a>
        <a>Stop</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item> Action 1 </a-menu-item>
            <a-menu-item> Action 2 </a-menu-item>
          </a-menu>
          <a> More <a-icon type="down" /> </a>
        </a-dropdown>
      </span>
    </a-table>
  </a-table>
</template>
<script>
const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: "Screem",
    platform: "iOS",
    version: "10.3.4.5654",
    upgradeNum: 500,
    creator: "Jack",
    createdAt: "2014-12-24 23:12:00",
  });
}

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: "2014-12-24 23:12:00",
    name: "123/456/789",
    upgradeNum: "Upgraded: 56",
  });
}

export default {
  data() {
    return {
      data,
      searchText: "",
      searchInput: "",
      searchedColumn: "",
      options: [{ value: "476" }, { value: "123" }, { value: "163" }], // 用于下拉搜索的数据
      selectedKey: "", // 选中的搜索关键字
      columns: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Platform", dataIndex: "platform", key: "platform" },
        { title: "Version", dataIndex: "version", key: "version" },
        { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
        { title: "Creator", dataIndex: "creator", key: "creator" },
        { title: "Date", dataIndex: "createdAt", key: "createdAt" },
        {
          title: "Action",
          key: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      innerData,
      innerColumns: [
        { title: "Date", dataIndex: "date", key: "date" },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender",
          },
          onFilter: (value, record) => {
            // return value.some((v) =>
            return record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
            // );
          },
          // onFilter: (value, record) => {
          //   return value.some((v) => record.name.toString().includes(v));
          // },
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "Status",
          key: "state",
          scopedSlots: { customRender: "status" },
        },
        { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
        {
          title: "Action",
          dataIndex: "operation",
          key: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
    };
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      // console.log(selectedKeys);
      // this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
  },
};
</script>
