<template>
  <div class="bill-list">
    <v-simple-table :dark="dark">
      <template v-slot:default>
        <thead class="text-left">
          <tr>
            <th>物品</th>
            <th>类别</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listData" :key="item.name" class="text-left">
            <td style="width: 150px">{{ item.item }}</td>
            <td>{{ item.typeName }}</td>
            <td style="width: 100px">￥{{ item.amount }}</td>
          </tr>
          <tr>
            <td>汇总</td>
            <td></td>
            <td class="text-left">￥{{ totalAmount }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>


export default {
  name: 'BillList',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    listData: {
      type: Array,
    },
    totalAmount: {
      type: Number,
    },
  },

  data() {
    return {

    }
  },
}
</script>

<style lang="less">
.bill-list {
  padding: 10px;
  .text-left {
    text-align: left;
  }
}
</style>