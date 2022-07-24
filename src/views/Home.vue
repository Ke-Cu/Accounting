<template>
  <div class="home">
    <v-app :class="dark ? 'bg-dark' : 'bg-light'">
      <app-bar @dark="toggleTheme" @navItem="getNavItem"></app-bar>
      <v-main>
        <!-- <date-picker v-show="navIndex === 3" :dark="dark" /> -->
        <!-- <bill-list
          :dark="dark"
          :listData="listData"
          :totalAmount="totalAmount"
        /> -->
        <list :dark="dark" />
      </v-main>
      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { accounting } from '../api/index'
import AppBar from '@/components/AppBar'
import BillList from '@/components/BillList'
import DatePicker from '@/components/DatePicker'

import List from '@/components/List'

export default {
  name: 'Home',
  components: {
    AppBar,
    BillList,
    DatePicker,
    List,
  },
  data() {
    return {
      dark: false,
      navIndex: 0,
      listData: [],
      totalAmount: 0,
    }
  },
  async mounted() {
    const res = await accounting.getToday()
    this.listData = res.details
    this.totalAmount = res.totalAmount
  },
  methods: {
    toggleTheme(dark) {
      this.dark = dark
    },
    getNavItem(index) {
      this.navIndex = index
      if (index === 1) {
        this.getScopeAmount(7)
      } else if (index === 2) {
        this.getScopeAmount(30)
      } else if (index === 0) {
        this.getScopeAmount(1)
      }
    },
    async getScopeAmount(days) {
      const res = await accounting.getScopeAmount({ days })
      this.listData = res.details
      this.totalAmount = res.totalAmount
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  .bg-light {
    background-color: #fff;
  }
  .bg-dark {
    background-color: rgb(77, 77, 77);
  }
}
</style>
