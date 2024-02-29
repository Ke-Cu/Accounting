<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="selectedDate"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark small v-bind="attrs" v-on="on">
        {{ selectedDate }} {{ weekDay }}
      </v-btn>
    </template>
    <v-date-picker v-model="selectedDate" scrollable color="grey darken-3">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> 取消 </v-btn>
      <v-btn text color="primary" @click="submit"> 确认 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DatePickerButton",
  props: {
    date: {
      type: String,
      default: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
    },
  },
  data: () => ({
    menu: false,
    modal: false,
    menu2: false,
  }),
  computed: {
    selectedDate: {
      get: function () {
        return this.date
      },
      set: function (newValue) {
        this.$emit("updateDate", newValue)
      },
    },
    weekDay() {
      const weekDay = new Date(this.selectedDate).getDay()
      const weekDays = ["日", "一", "二", "三", "四", "五", "六"]
      return `周${weekDays[weekDay]}`
    },
  },
  methods: {
    submit() {
      this.$refs.dialog.save(this.selectedDate)
      this.$emit("onSubmit", this.selectedDate)
    },
  },
}
</script>
