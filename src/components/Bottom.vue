<template>
  <div class="bottom">
    <v-bottom-navigation
      v-model="value"
      :dark="dark"
      color="cyan"
      height="70"
      grow
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
          value: "daily",
          icon: "mdi-calendar-today",
          text: "日账单",
        },
        {
          value: "month",
          icon: "mdi-equalizer-outline",
          text: "月账单",
        },
        {
          value: "update",
          icon: "mdi-application-edit-outline",
          text: "记账",
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
