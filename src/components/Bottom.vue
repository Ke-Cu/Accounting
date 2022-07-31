<template>
  <div class="bottom">
    <!-- <v-card class="mx-auto" :dark="dark"> -->
    <v-bottom-navigation v-model="value" :dark="dark" grow color="cyan">
      <v-btn value="recent" depressed>
        <span>最近明细</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn value="month">
        <span>月账单</span>

        <v-icon>mdi-equalizer-outline</v-icon>
      </v-btn>

      <v-btn value="other">
        <span>其他数据</span>

        <v-icon>mdi-list-box-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  props: {
    dark: {
      type: Boolean,
    },
  },
  data() {
    return {
      value: "recent",
    }
  },
  watch: {
    value() {
      this.$emit('currentTab', this.value)
    }
  },
}
</script>

<style lang="less" scoped>
.bottom {
  width: 100%;
  .v-bottom-navigation {
    box-sizing: content-box;
    height: 70px !important;
    padding-bottom: 20px;
  }
}
</style>
