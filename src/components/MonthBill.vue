<template>
  <div class="month-bill">
    <date-picker :dark="dark" @currentDate="getCurrentDate" />
    <v-card class="mt-4 pa-6 mx-auto" max-width="400" :dark="dark">
      本月总消费： ￥<span>{{ monthTotal }}</span>
    </v-card>
    <v-card class="mt-4 pa-3 mx-auto" max-width="400" :dark="dark">
      <v-card-subtitle>类别明细</v-card-subtitle>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">类别</th>
              <th class="text-left">消费额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in monthDatasets" :key="item.name">
              <td>{{ item.type }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card class="mt-4 pa-3 mx-auto" max-width="400" :dark="dark">
      <v-card-subtitle>类别图表</v-card-subtitle>
      <doughnut-chart :dark="dark" :chartData="chartData" />
    </v-card>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import DatePicker from './DatePicker.vue'
import DoughnutChart from './DoughnutChart.vue'
import { accounting } from '../api/index'

export default {
  components: { BarChart, DatePicker, DoughnutChart },
  name: 'MonthBill',
  props: {
    dark: {
      type: Boolean,
    },
  },
  data() {
    return {
      monthTotal: null,
      monthDatasets: [],
    }
  },
  mounted() {
    const now = new Date
    const dateDetail = {
      'year': now.getFullYear(),
      'month': now.getMonth() + 1
    }
    this.getMonthBill(dateDetail)
  },
  computed: {
    chartData() {
      const color = ['#ffb6b9', '#fae3d9', '#bbded6', '#8ac6d1', '#fff1ac', '#b689b0', '#2694ab', '#e59572', '#fdc4b6', '#ea7070']
      let colorIndex = 0
      const labels = []
      const data = []
      const backgroundColor = []
      this.monthDatasets.forEach(t => {
        labels.push(t.type)
        data.push(t.amount)
        backgroundColor.push(color[colorIndex])
        colorIndex = colorIndex == 9 ? 0 : colorIndex + 1
      })
      const chartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: backgroundColor,
            data: data,
          }
        ]
      }
      return chartData
    }
  },
  methods: {
    async getMonthBill(dateDetail) {
      const res = await accounting.getMonthBill(dateDetail)
      this.monthDatasets = res.data
      this.monthTotal = res.totalAmount
    },
    getCurrentDate(dateDetail) {
      this.getMonthBill(dateDetail)
    }
  },
}
</script>

<style lang="less" scoped>
.month-bill {
  padding: 10px;
}
</style>