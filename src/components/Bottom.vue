<template>
  <div class="bottom">
    <v-card class="mx-auto" :dark="dark">
      <v-bottom-navigation v-model="value">
        <v-btn value="recent">
          <span>最近明细</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn value="favorites">
          <span>月账单</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn value="nearby">
          <span>其他数据</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-card>
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
}
</script>

<style lang="less" scoped>
.bottom {
  width: 100%;
}
</style>
