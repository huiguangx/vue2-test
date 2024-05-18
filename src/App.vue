<template>
  <div>
    <!-- <FormLinkage /> -->
    <!-- <FormLinkageAntd /> -->
    <!-- <TestCom /> -->
    <!-- <treeCom></treeCom> -->
    <!-- <TableSidebar /> -->
    <!-- <MainComponent></MainComponent> -->
    <Aselect></Aselect>
  </div>
</template>

<script>
// import FormLinkage from "./components/FormLinkage.vue";
// import FormLinkageAntd from "./components/FormLinkageAntd.vue";
// import TestCom from "./components/TestCom.vue";
// import treeCom from "./components/treeCom.vue";
// import TableSidebar from "./components/TableSidebar.vue";
// import MainComponent from "./components/MainComponent.vue";
import Aselect from "./components/Aselect.vue";
export default {
  name: "App",
  components: {
    // FormLinkage,
    // FormLinkageAntd,
    // TestCom,
    // treeCom,
    // TableSidebar,
    // MainComponent,
    Aselect,
  },
  methods: {
    getNum() {
      console.log("77777");
      console.log("hotfix");
    },
  },
};
</script>

<style></style>
