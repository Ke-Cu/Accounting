<template>
  <div class="list">
    <v-card class="mx-auto" max-width="500">
      <v-list :dark="dark">
        <v-subheader>最近30天</v-subheader>
        <v-divider></v-divider>
        <v-list-group
          v-for="(item, index) in billData"
          :key="index"
          v-model="item.active"
          prepend-icon="mdi-calendar-week"
          no-action
          color="blue-grey lighten-2 "
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.month + '月' + item.day + '日'">
              </v-list-item-title>
            </v-list-item-content>
            ￥{{ item.dayTotal }}
          </template>
          <v-list-item v-for="child in item.records" :key="child.msgId">
            <v-list-item-content>
              <v-list-item-title v-text="child.item"></v-list-item-title>
              <v-list-item-subtitle> {{ child.typeName }}</v-list-item-subtitle>
            </v-list-item-content>
            {{ child.amount }}
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { accounting } from '../api/index'
export default {
  name: 'List',
  props: {
    dark: {
      type: Boolean,
    }
  },
  data() {
    return {
      billData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await accounting.getScopeAmount({ days: 30 })
      //   console.log(res)
      this.billData = res.reverse()
      this.billData[0].active = true
    }
  },
}
</script>

<style lang="less" scoped>
.list {
  padding: 10px;
  color: #333;
}
</style>