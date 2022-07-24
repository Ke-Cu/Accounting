<template>
  <div class="date-picker">
    <v-date-picker
      :dark="dark"
      v-model="dates"
      range
      width="100%"
      no-title
      color="blue-grey lighten-2"
    ></v-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dates: [],
    }
  }
}
</script>

<style lang="less" scoped>
.date-picker {
  .v-date-picker {
    width: 100%;
  }
}
</style>