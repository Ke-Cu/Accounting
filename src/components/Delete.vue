<template>
  <div class="delete">
    <v-row class="my-2 ml-6">
      <v-col cols="4"><DatePickerButton /></v-col>
      <v-col class="mt-1 grey--text text--darken-3">
        今日总支出：￥{{ totalAmount }}
      </v-col>
    </v-row>
    <v-card class="ma-3">
      <v-list>
        <template v-for="(item, index) in dayDetails">
          <v-list-item :key="item.msgId">
            <v-list-item-content>
              <v-list-item-title>{{ item.item }}</v-list-item-title>
              <v-list-item-subtitle class="ml-2">
                <span class="cyan--text text--darken-1 mr-1">
                  {{ item.typeName }}
                </span>
                ￥{{ item.amount }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="onClickDelete">
                <v-icon color="red lighten-2">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < dayDetails.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-snackbar centered v-model="snackbar" :vertical="vertical">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { accounting } from '../api/index'
import DatePickerButton from "@/components/DatePickerButton.vue"

export default {
  name: 'Delete',
  components: {
    DatePickerButton,
  },
  data() {
    return {
      dayDetails: [],
      totalAmount: 0,
      snackbar: false,
      text: 'Lorem ipsum dolor sit amet',
      vertical: true,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await accounting.getToday()
      this.dayDetails = res.details
      this.totalAmount = res.totalAmount
    },
    onClickDelete() {
      this.snackbar = true
    },
  },
}
</script>

<style>
</style>