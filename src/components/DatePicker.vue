<template>
  <div class="date-picker">
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
      :dark="dark"
    >
      <template v-slot:activator="{ on, attrs }">
        <div :class="['title', dark ? 'dark' : ' ']" v-bind="attrs" v-on="on">
          <span>
            <span class="month">{{ month }}月</span>
            消费汇总
            <span class="year">({{ date }})</span>
          </span>
          <v-icon :dark="dark">mdi-calendar-month-outline</v-icon>
        </div>
      </template>
      <v-date-picker v-model="date" type="month" scrollable color="cyan">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="handleClickOK"> OK </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      modal: false,
    }
  },
  computed: {
    month() {
      const month = Number(this.date.slice(5))
      return month
    }
  },
  methods: {
    handleClickOK() {
      this.$refs.dialog.save(this.date)
      const dateDetail = {
        year: Number(this.date.slice(0, 4)),
        month: Number(this.date.slice(5)),
      }
      this.$emit('currentDate', dateDetail)
    }
  },
}
</script>

<style lang="less" scoped>
.date-picker {
  .title {
    display: flex;
    justify-content: space-between;
    margin: 20px 40px;
    .month {
      font-size: 28px;
      color: #00bcd4;
    }
    .year {
      color: #aaa;
    }
  }
  .dark {
    color: #fff;
  }
}
</style>