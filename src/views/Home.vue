<template>
  <div class="home">
    <v-app :class="dark ? 'bg-dark' : 'bg-light'">
      <app-bar
        :isLoading="isLoading"
        @dark="toggleTheme"
        @navItem="getNavItem"
        @refresh="handleRefresh"
      ></app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-footer app :class="dark ? 'bg-dark' : 'bg-light'">
        <Bottom :dark="dark" />
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { accounting } from "../api/index"
import AppBar from "@/components/AppBar"
import Bottom from "@/components/Bottom"

export default {
  name: "Home",
  components: {
    AppBar,
    Bottom,
  },
  data() {
    return {
      dark: false,
      navIndex: 0,
      listData: [],
      totalAmount: 0,
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
