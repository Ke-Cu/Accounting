<template>
  <div class="container">
    <v-card class="grey lighten-4 pa-6 mb-4">
      <v-row class="mb-2">
        <DatePickerButton class="mr-2" @updateDate="updateDate" />
        <CategoryButton
          class="mr-2"
          :category="category"
          :categorys="categorys"
          @updateCategory="updateCategory"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model="inputString"
          label="记账"
          solo
          @keydown.enter="onClickSend"
          @input="inputChange"
        ></v-text-field>
        <v-btn class="mt-1 ml-2" icon large @click="onClickSend">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>
      <v-row class="pa-2 grey--text text--darken-2 text-caption">
        {{ billDetails }}
      </v-row>
    </v-card>
    <div class="alert-list">
      <v-alert
        v-for="(alert, index) in alertLsit"
        :key="index"
        :value="alert.isShow"
        transition="slide-x-transition"
        class="text-caption"
        color="#4CAF50"
        dark
        dense
        elevation="2"
      >
        {{ alert.text }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import CategoryButton from "@/components/CategoryButton.vue"
import DatePickerButton from "@/components/DatePickerButton.vue"

export default {
  name: "Add",
  components: {
    CategoryButton,
    DatePickerButton,
  },
  data() {
    return {
      inputString: "",
      category: "餐饮",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      accountDetail: "",
      price: "",
      alertLsit: [],
      categorys: [
        "餐饮",
        "交通",
        "日用品",
        "服饰",
        "美妆",
        "宠物",
        "电子产品",
        "住房",
        "家居",
        "学习",
        "汽车",
        "其他",
        "医疗",
        "旅游",
        "运动",
      ],
    }
  },
  computed: {
    billDetails() {
      const inputString = this.inputString.trim()
      const {
        beforeNumber: accountDetail,
        matchedNumber: price,
        afterNumber: category,
      } = this.getAccountingResult(inputString)
      let billDetails = ""
      if (accountDetail && price) {
        billDetails = `${accountDetail} ￥${price}（日期：${this.date}， 类别：${this.category}）`
      } else {
        billDetails = "请输入记账明细"
      }
      return billDetails
    },
  },
  methods: {
    getAccountingResult(inputString) {
      // 定义正则表达式
      const regex = /\d+(\.\d+)?/g
      let match
      let lastNumberStart = -1
      let lastNumberEnd = -1
      let beforeNumber = ""
      let matchedNumber = ""
      let afterNumber = ""
      // 通过循环多次调用 exec 方法，可以找到所有匹配项
      while ((match = regex.exec(inputString)) !== null) {
        lastNumberStart = match.index // 更新最后一个数字的开始位置
        lastNumberEnd = match.index + match[0].length - 1 // 计算结束位置
        beforeNumber = inputString.substring(0, lastNumberStart) // 开始位置之前的部分
        matchedNumber = match[0] // 匹配的数字本身
        afterNumber = inputString.substring(lastNumberEnd + 1) // 结束位置之后的部分
      }
      return {
        beforeNumber,
        matchedNumber,
        afterNumber,
      }
    },
    updateCategory(category) {
      this.category = category
    },
    updateDate(date) {
      this.date = date
    },
    inputChange() {
      const inputString = this.inputString.trim()
      const {
        beforeNumber: accountDetail,
        matchedNumber: price,
        afterNumber: category,
      } = this.getAccountingResult(inputString)
      if (accountDetail && price) {
        this.accountDetail = accountDetail
        this.price = price
        if (this.categorys.includes(category)) {
          this.category = category
        } else {
          this.category = "餐饮"
        }
      }
    },
    onClickSend() {
      if (this.billDetails === "请输入记账明细") {
        return
      }
      this.alertLsit.unshift({
        text: this.billDetails,
        isShow: false,
      })
      setTimeout(() => {
        this.alertLsit[0].isShow = true
      }, 100)
      this.inputString = ""
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
</style>
