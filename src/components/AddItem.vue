<template>
  <v-card class="ma-3 pa-3">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="formData.date" label="Picker in dialog" prepend-icon="mdi-calendar" readonly
                  v-bind="attrs" v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="formData.date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select prepend-icon="mdi-map" v-model="selectedOption" :items="options" label="下拉选择框"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="inputValue" label="输入框">
              <v-icon slot="prepend" color="green">
                mdi-map
              </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="inputValue2" label="输入框">
              <v-icon slot="prepend" color="green">
                mdi-map
              </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" @click="handleConfirmation">确认</v-btn>
            <v-btn color="error" @click="handleClear">清空</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      inputValue: '',
      inputValue2: '',
      selectedDate: null,
      selectedOption: null,
      menu: false,
      options: ['选项1', '选项2', '选项3'],
      formData: {
        date: null,
        select: null,
        checkbox: null,
        switch: null,
        text: null
      },
    };
  },
  methods: {
    handleInput(event) {
      const inputValue = event.target.value;
      if (!this.numberRegex.test(inputValue)) {
        event.target.value = this.inputValue;
      } else {
        this.inputValue = inputValue;
      }
    },
    handleConfirmation() {
      // 执行确认逻辑
      console.log("确认按钮被点击！");
      console.log("输入值：", this.inputValue, this.selectedDate, this.selectedOption);
      // 其他逻辑处理
    },
    handleClear() {
      this.inputValue = null; // 清空输入框
      // 清空其他表单数据
    }
  }
};
</script>
