<template>
  <div>
    <a-tabs
      v-model="tabActive"
      type="editable-card"
      @change="onChange"
      @edit="onDel"
    >
      <a-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :tab="item.name"
        :closable="tabList.length !== 1"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import qiankun from "../utils/qiankun.js";

export default {
  mixins: [qiankun],
  data() {
    return {
      tabActive: Number(this.$store.getters.getActiveTabs)
    };
  },
  computed: {
    tabList() {
      return this.$store.getters.getTabItems;
    }
  },
  watch: {
    "$store.getters.getActiveTabs": function(val) {
      this.tabActive = val;
    }
  },
  methods: {
    onDel(targetKey) {
      this.$store.dispatch("delTabs", targetKey);
    },
    onChange(targetKey) {
      this.tabActive = targetKey;
      this.$router.push({ path: this.tabList[targetKey].path });
      this.$store.commit("setActiveTabs", targetKey);
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    }
  }
};
</script>
