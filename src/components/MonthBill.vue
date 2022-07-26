<template>
  <div class="month-bill">
    <v-card class="mt-4 pa-4 pt-4 mx-auto" max-width="400" :dark="dark">
      <v-card class="pt-1 pb-1 mx-auto date-card" color="cyan" dark>
        <date-picker :dark="dark" @currentDate="getCurrentDate" />
      </v-card>
      本月总消费： ￥<span>{{ monthTotal }}</span>
    </v-card>
    <v-expand-transition>
      <category-detail v-show="isShowDetail" :dark="dark" :detail="categoryDetail" @hideDetail="isShowDetail = false" />
    </v-expand-transition>
    <v-card v-show="monthTotal !== 0 && !isShowDetail" class="mt-4 pt-3 mx-auto" max-width="400" :dark="dark">
      <v-card-subtitle class="ml-3">类别明细</v-card-subtitle>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">类别</th>
              <th class="text-left">消费额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in monthDatasets" :key="item.name" @click="showDetail(item)">
              <td>{{ item.type }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card v-show="monthTotal !== 0 && !isShowDetail" class="mt-4 pa-3 mx-auto" max-width="400" :dark="dark">
      <v-card-subtitle>类别图表</v-card-subtitle>
      <doughnut-chart :dark="dark" :chartData="chartData" />
    </v-card>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import DatePicker from './DatePicker.vue'
import DoughnutChart from './DoughnutChart.vue'
import CategoryDetail from './CategoryDetail.vue'
import { accounting } from '../api/index'

export default {
  components: { BarChart, DatePicker, DoughnutChart, CategoryDetail },
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
      categoryDetail: {},
      isShowDetail: false,
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
            borderWidth: 3,
            backgroundColor: backgroundColor,
            data: data,
          }
        ]
      }
      if (this.dark) {
        chartData.datasets[0].borderColor = '#1e1e1e'
      } else {
        chartData.datasets[0].borderColor = '#ffffff'
      }
      return chartData
    }
  },
  methods: {
    async getMonthBill(data) {
      let dateDetail = data
      if (!dateDetail) {
        const now = new Date
        dateDetail = {
          'year': now.getFullYear(),
          'month': now.getMonth() + 1
        }
      }
      const res = await accounting.getMonthBill(dateDetail)
      this.monthDatasets = res.data
      this.monthTotal = res.totalAmount
    },
    getCurrentDate(dateDetail) {
      this.getMonthBill(dateDetail)
    },
    showDetail(item) {
      this.categoryDetail = item
      this.isShowDetail = true
    }
  },
}
</script>

<style lang="less" scoped>
.month-bill {
  padding: 10px;

  .date-card {
    position: relative;
    top: -30px;
  }
}
</style>

<style lang="less">
.month-bill {
  canvas {
    height: 400px !important;
  }
}
</style>