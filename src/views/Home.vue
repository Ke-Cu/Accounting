<template>
  <div class="home">
    <v-app :class="dark ? 'bg-dark' : 'bg-light'">
      <app-bar @dark="toggleTheme" @navItem="getNavItem"></app-bar>
      <v-main>
        <list :dark="dark" />
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
import List from "@/components/List"
import Bottom from "@/components/Bottom"

export default {
  name: "Home",
  components: {
    AppBar,
    List,
    Bottom,
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
    },
  },
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
  .v-footer {
    padding: 3px 8px;
  }
}
</style>
