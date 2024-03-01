<template>
  <div>
    <v-btn
      class="mx-4"
      width="30"
      min-width="30"
      small
      elevation="1"
      @click="onClickBack"
    >
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <DatePickerButton
      :date="datePick"
      @updateDate="updateDate"
      @onSubmit="onSubmit"
    />
    <v-btn
      class="mx-4"
      width="30"
      min-width="30"
      small
      elevation="1"
      @click="onClickForward"
    >
      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
  </div>
</template>

<script>
import DatePickerButton from "@/components/DatePickerButton.vue"

export default {
  name: "DatePickerPage",
  components: {
    DatePickerButton,
  },
  props: {
    date: {
      type: String,
      default: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
    },
  },
  computed: {
    datePick: {
      get: function () {
        return this.date
      },
      set: function (newValue) {
        this.$emit("updateDate", newValue)
      },
    },
  },
  methods: {
    onClickBack() {
      const date = new Date(this.date)
      date.setDate(date.getDate() - 1)
      this.$emit("updateDate", date.toISOString().substring(0, 10))
      this.$emit("turnPage")
    },
    onClickForward() {
      const date = new Date(this.date)
      date.setDate(date.getDate() + 1)
      this.$emit("updateDate", date.toISOString().substring(0, 10))
      this.$emit("turnPage")
    },
    updateDate(date) {
      this.$emit("updateDate", date)
    },
    onSubmit(date) {
      this.$emit("onSubmit", date)
    },
  },
}
</script>

<style></style>
