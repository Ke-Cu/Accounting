<template>
  <div class="container">
    <div class="top">
      <button @click="focusAndShowKeyboard">点击聚焦输入框并弹出键盘</button>
    </div>
    <!-- <div class="fixed-element"> -->
    <v-card class="grey lighten-4 pa-6">
      <v-row class="mb-2">
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
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-btn class="mr-2" color="red" dark small> 餐饮 </v-btn>
      </v-row>
      <v-row>
        <v-text-field
          :append-outer-icon="'mdi-send'"
          ref="numericInput"
          label="记账"
          solo
        ></v-text-field>
      </v-row>
      <v-row class="pa-2 grey--text text--darken-2 text-caption">
        麦当劳 ￥13.9 （日期：2023-08-09； 类别：餐饮）
      </v-row>
    </v-card>

    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  methods: {
    focusAndShowKeyboard() {
      // 获取输入框的引用
      const numericInput = this.$refs.numericInput

      // 聚焦输入框
      numericInput.focus()
    },
  },
}
</script>

<style>
.container {
  position: relative;
  padding-bottom: 120px; /* 给固定元素留出空间 */
}
.top {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.fixed-element {
  /* position: fixed;
  bottom: 0px; */
  /* width: 100%; */
  background-color: #f0f0f0;
  padding: 20px;
  padding-bottom: 0px;
  /* box-sizing: border-box; */
}
</style>
