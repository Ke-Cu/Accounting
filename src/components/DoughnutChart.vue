<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    dark: {
      type: Boolean,
    },
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: ['#ffb6b9', '#fae3d9', '#bbded6', '#8ac6d1'],
              data: [40, 20, 80, 10]
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      chartOptions: {
        color: '#00000099',
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch: {
    dark() {
      if (this.dark) {
        this.chartOptions.color = '#ffffff'
      } else {
        this.chartOptions.color = '#00000099'
      }
    }
  },
}
</script>
