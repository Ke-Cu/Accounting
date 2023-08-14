<template>
  <div class="bottom">
    <v-bottom-navigation
      v-model="value"
      :dark="dark"
      color="cyan"
      grow
      height="70"
      class=""
    >
      <v-btn v-for="(item, index) in btnList" :key="index" :value="item.value">
        <span class="mt-1">{{ item.text }}</span>
        <v-icon>{{ item.icon }}</v-icon>
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
      btnList: [
        {
          value: "recent",
          icon: "mdi-history",
          text: "最近明细",
        },
        {
          value: "month",
          icon: "mdi-equalizer-outline",
          text: "月账单",
        },
        {
          value: "updateBill",
          icon: "mdi-application-edit-outline",
          text: "记账",
        },
        {
          value: "user",
          icon: "mdi-account-circle-outline",
          text: "个人中心",
        },
      ],
    }
  },
  watch: {
    value() {
      this.$emit("currentTab", this.value)
    },
  },
}
</script>

<style lang="less" scoped>
.bottom {
  width: 100%;
  .v-bottom-navigation {
    padding-bottom: 90px;
  }
}
</style>
