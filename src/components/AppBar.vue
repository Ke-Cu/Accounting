<template>
  <div class="app-bar">
    <v-app-bar color="#ffffff" dense fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon :class="dark ? 'dark' : 'light'">mdi-brightness-2</v-icon>
      </v-btn>
      <v-btn icon @click="handleRefresh">
        <v-icon :size="28" color="#00BCD4">mdi-refresh</v-icon>
      </v-btn>
      <!-- <v-progress-circular v-show="!isLoading" indeterminate color="#00BCD4" :size="20"></v-progress-circular> -->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary :dark="dark">
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item v-for="(item, index) in listItems" :key="index" @click="clickItem(index)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    isLoading: {
      type: Boolean,
    }
  },
  data() {
    return {
      title: '可家账单',
      dark: false,
      drawer: false,
      group: 0,
      listItems: [
        { icon: 'mdi-calendar-today', text: '今日明细' },
        { icon: 'mdi-calendar-week', text: '最近一周' },
        { icon: 'mdi-calendar-month', text: '最近一月' },
        { icon: 'mdi-calendar-blank', text: '自定义日期' },
        { icon: 'mdi-cog', text: '设置' },
      ],
    }
  },
  methods: {
    toggleTheme() {
      this.dark = !this.dark
      this.$emit('dark', this.dark)
    },
    clickItem(index) {
      this.title = this.listItems[index].text
      this.drawer = false
    },
    handleRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="less">
.app-bar {
  .v-app-bar {
    .v-btn {
      .light {
        color: #ffb531;
      }

      .dark {
        color: #333;
      }
    }
  }

  .v-navigation-drawer {
    padding: 30px 10px;
  }

  .v-progress-circular {
    margin-right: 10px;
  }
}
</style>