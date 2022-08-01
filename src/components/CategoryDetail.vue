<template>
  <div class="category-detail">
    <v-card class="mt-4 pt-3 mx-auto" max-width="400" :dark="dark">
      <div class="header">
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="red lighten-2"
          depressed
          @click="hideDetail"
        >
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">日期</th>
              <th class="text-left">明细</th>
              <th class="text-left">金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in detail.details" :key="item.name">
              <td>{{ item.createTime }}</td>
              <td>{{ item.item }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CategoryDetail',
  props: {
    dark: {
      type: Boolean,
    },
    detail: {
      type: Object,
    }
  },
  watch: {
    detail() {
      this.items[1].text = this.detail.type
    }
  },
  data() {
    return {
      items: [
        {
          text: '类别明细',
          disabled: false,
        },
        {
          text: '餐饮',
          disabled: true,
        },
      ],
    }
  },
  methods: {
    hideDetail() {
      this.$emit('hideDetail')
    }
  },
}
</script>

<style lang="less" scoped>
.category-detail {
  .v-breadcrumbs {
    display: inline-block;
    width: 84%;
  }
  .v-btn {
    display: inline-block;
  }
}
</style>