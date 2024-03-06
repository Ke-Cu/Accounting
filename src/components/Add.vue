<template>
  <div class="pa-3 pt-0">
    <v-card class="grey lighten-4 pa-6 mb-4">
      <v-row justify="center">
        <DataPickerPage :date="date" @updateDate="updateDate" />
      </v-row>
      <v-row class="mt-5">
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
        min-height="37"
        dark
        dense
        elevation="2"
      >
        <v-row
          @touchstart.stop="touchstart"
          @touchmove.stop="touchmove($event, alert)"
        >
          <v-col cols="10">
            {{ alert.text }}
          </v-col>
          <v-col cols="2">
            <span class="pl-6">
              <transition name="slide-fade">
                <v-btn
                  v-show="alert.isShowBtn"
                  @click="onDeleteRecord(index, alert)"
                  icon
                  x-small
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </transition>
            </span>
          </v-col>
        </v-row>
      </v-alert>
    </div>
  </div>
</template>

<script>
import { accounting } from "../api/index"
import CategoryButton from "@/components/CategoryButton.vue"
import DataPickerPage from "@/components/DatePickerPage.vue"

export default {
  name: "Add",
  components: {
    CategoryButton,
    DataPickerPage,
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
        billDetails = `${accountDetail} ￥${price}（${this.date} ${this.category.typeName}）`
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
    touchstart(e) {
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
    },
    touchmove(e, alert) {
      this.moveX = e.touches[0].clientX
      this.moveY = e.touches[0].clientY

      if (this.moveX - this.startX <= -50) {
        alert.isShowBtn = true
        this.alertLsit.forEach((item) => {
          if (item !== alert) {
            item.isShowBtn = false
          }
        })
      } else if (this.moveX - this.startX >= 50) {
        alert.isShowBtn = false
      }
    },
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
      let id = -1
      try {
        const res = await accounting.addRecord(params)
        id = res.data.id
      } catch (error) {
        const alertText =
          error.response.status === 401
            ? "记账失败（未登录）"
            : error.response.data != ""
            ? error.response.data
            : "记账失败"
        this.alertLsit.unshift({
          text: alertText,
          color: "red",
          isShow: false,
        })
        setTimeout(() => {
          this.alertLsit[0].isShow = true
        }, 100)
      } finally {
        this.alertLsit.unshift({
          id,
          text: this.billDetails,
          color: "green",
          isShow: false,
          isShowBtn: false,
        })
        setTimeout(() => {
          this.alertLsit[0].isShow = true
        }, 100)
        this.inputString = ""
      }
    },
    async onDeleteRecord(index, data) {
      if (data.id === -1) {
        return
      }
      try {
        await accounting.delRecord({ id: data.id })
      } finally {
        this.alertLsit.splice(index, 1)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
