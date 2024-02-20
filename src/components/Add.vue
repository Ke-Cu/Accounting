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
        :color="alert.color"
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
import { accounting } from "../api/index"
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
      category: { typeName: "餐饮", typeId: 1 },
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      accountDetail: "",
      price: "",
      alertLsit: [],
      categorys: [],
    }
  },
  computed: {
    billDetails() {
      const inputString = this.inputString.trim()
      const {
        beforeNumber: accountDetail,
        matchedNumber: price,
        afterNumber: categoryName,
      } = this.getAccountingResult(inputString)
      let billDetails = ""
      if (accountDetail && price) {
        billDetails = `${accountDetail} ￥${price}（日期：${this.date}， 类别：${this.category.typeName}）`
      } else {
        billDetails = "请输入记账明细"
      }
      return billDetails
    },
  },
  mounted() {
    this.getCategorys()
  },
  methods: {
    async getCategorys() {
      this.categorys = await accounting.getTypes()
    },
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
        afterNumber: categoryName,
      } = this.getAccountingResult(inputString)
      if (accountDetail && price) {
        this.accountDetail = accountDetail
        this.price = price
        if (categoryName !== "") {
          const findedIndex = this.categorys.findIndex(
            (item) => item.typeName === categoryName
          )
          if (findedIndex !== -1) {
            this.category = this.categorys[findedIndex]
          } else {
            this.category = { typeName: "餐饮", typeId: 1 }
          }
        }
      }
    },
    async onClickSend() {
      if (this.billDetails === "请输入记账明细") {
        return
      }
      const params = {
        createTime: new Date(this.date).getTime(),
        item: this.accountDetail,
        amount: this.price,
        typeId: this.category.typeId,
      }
      try {
        await accounting.addRecord(params)
        this.alertLsit.unshift({
          text: this.billDetails,
          color: "green",
          isShow: false,
        })
        setTimeout(() => {
          this.alertLsit[0].isShow = true
        }, 100)
        this.inputString = ""
      } catch (error) {
        this.alertLsit.unshift({
          text: "记账失败 （" + error.response.data + "）",
          color: "red",
          isShow: false,
        })
        setTimeout(() => {
          this.alertLsit[0].isShow = true
        }, 100)
      }
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
