<template>
  <div class="home">
    <v-app :class="dark ? 'bg-dark' : 'bg-light'">
      <app-bar :isLoading="isLoading" @dark="toggleTheme" @navItem="getNavItem" @refresh="handleRefresh"></app-bar>
      <v-main>
        <list ref="list" v-show="currentTab === 'recent'" :dark="dark" />
        <month-bill ref="monthBill" v-show="currentTab === 'month'" :dark="dark" />
        <other v-show="currentTab === 'other'" :dark="dark" />
      </v-main>
      <v-footer app :class="dark ? 'bg-dark' : 'bg-light'">
        <Bottom :dark="dark" @currentTab="getCurrentTab" />
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { accounting } from "../api/index"
import AppBar from "@/components/AppBar"
import List from "@/components/List"
import MonthBill from "@/components/MonthBill"
import Bottom from "@/components/Bottom"
import Other from "@/components/Other"

export default {
  name: "Home",
  components: {
    AppBar,
    List,
    Bottom,
    MonthBill,
    Other,
  },
  data() {
    return {
      dark: false,
      navIndex: 0,
      listData: [],
      totalAmount: 0,
      currentTab: 'recent',
      isLoading: false,
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
    handleRefresh() {
      this.isLoading = true
      console.log("refresh")
      this.$refs.list.getData()
      this.$refs.monthBill.getMonthBill()
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    async getScopeAmount(days) {
      const res = await accounting.getScopeAmount({ days })
      this.listData = res.details
      this.totalAmount = res.totalAmount
    },
    getCurrentTab(tab) {
      this.currentTab = tab
    }
  },
}
</script>

<style lang="less" scope>
.home {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;

  .v-main {
    padding-top: 50px !important;
  }

  .bg-light {
    background-color: #fff !important;
  }

  .bg-dark {
    background-color: rgb(77, 77, 77) !important;
  }

  .v-footer {
    padding: 0;
  }
}
</style>
