<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-2" dark small v-bind="attrs" v-on="on">
        {{ date }}
      </v-btn>
    </template>
    <v-date-picker v-model="date" scrollable color="grey darken-3">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> 取消 </v-btn>
      <v-btn text color="primary" @click="submit"> 确认 </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'DatePickerButton',
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  methods: {
    submit() {
      this.$refs.dialog.save(this.date)
      this.$emit("updateDate", this.date)
    }
  }
}
</script>