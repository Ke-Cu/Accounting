<template>
  <div class="delete">
    <v-card class="grey lighten-4 py-6 ma-3">
      <v-row justify="center">
        <DatePickerPage
          :date="date"
          @updateDate="updateDate"
          @onSubmit="getData"
          @turnPage="getData"
        />
      </v-row>
      <v-row justify="end">
        <span class="mt-4 mr-8 grey--text text--darken-4">
          合计支出：￥{{ totalAmount }}
        </span>
      </v-row>
    </v-card>
    <v-card class="ma-3">
      <div v-if="dayDetails.length === 0" class="pa-6 text-center">
        <v-icon color="grey " large>mdi-package-variant</v-icon>
        <div class="grey--text text--darken-2">暂无记录</div>
      </div>
      <v-list>
        <template v-for="(item, index) in dayDetails">
          <v-list-item :key="item.id" v-if="item.id">
            <v-list-item-content>
              <v-list-item-title>{{ item.item }}</v-list-item-title>
              <v-list-item-subtitle class="">
                <span class="cyan--text text--darken-1 mr-1">
                  {{ item.typeName }}
                </span>
                ￥{{ item.amount }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="onClickDelete(item)">
                <v-icon color="red lighten-2">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < dayDetails.length - 1" :key="index">
          </v-divider>
        </template>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="grey darken-3 white--text">
          确认删除
        </v-card-title>
        <v-card-text class="pl-8 pt-4">
          <div>日期：{{ date }}</div>
          <div>{{ dialogData.item }} （{{ dialogData.typeName }} ）</div>
          <div>￥ {{ dialogData.amount }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> 取消 </v-btn>
          <v-btn color="primary" text @click="deleteRecord(dialogData)">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { accounting } from "../api/index"
import DataPickerPage from "@/components/DatePickerPage.vue"
import DatePickerPage from "./DatePickerPage.vue"

export default {
  name: "Delete",
  components: {
    DataPickerPage,
    DatePickerPage,
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      dayDetails: [],
      totalAmount: 0,
      dialog: false,
      dialogData: {},
    }
  },
  computed: {
    dialogText() {
      return `${this.date}\n${this.totalAmount}`
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const params = {
        year: parseInt(this.date.substring(0, 4)),
        month: parseInt(this.date.substring(5, 7)),
        day: parseInt(this.date.substring(8, 10)),
      }
      const details = await accounting.getBillByDate(params)
      this.dayDetails = details
      this.totalAmount = 0
      details.forEach((item) => {
        this.totalAmount += item.amount
      })
      this.totalAmount = this.totalAmount.toFixed(2)
    },
    onClickDelete(item) {
      this.dialogData = item
      this.dialog = true
    },
    updateDate(date) {
      this.date = date
    },
    async deleteRecord(item) {
      await accounting.delRecord({ id: item.id })
      this.getData()
      this.dialog = false
    },
  },
}
</script>

<style></style>
