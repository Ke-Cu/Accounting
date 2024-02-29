<template>
  <v-dialog
    ref="dialog"
    v-model="dialog"
    scrollable
    max-width="300px"
    persistent
    :return-value.sync="selectedCategory"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="rounded-t-lg px-4"
        color="red"
        tile
        dark
        small
        v-bind="attrs"
        v-on="on"
      >
        {{ selectedCategory.typeName }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>切换类别</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-4" style="height: 300px">
        <v-chip-group
          v-model="selectedCategory"
          active-class="primary--text"
          mandatory
          column
        >
          <v-chip v-for="tag in categorys" :key="tag.typeId" :value="tag">
            {{ tag.typeName }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false"> 取消 </v-btn>
        <v-btn color="blue darken-1" text @click="submit"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CategoryButton",
  props: {
    category: {
      default: { typeName: "餐饮", typeId: 1 },
      type: Object,
    },
    categorys: {
      type: Array,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    selectedCategory: {
      get: function () {
        return this.category
      },
      set: function (newValue) {
        this.$emit("updateCategory", newValue)
      },
    },
  },
  methods: {
    submit() {
      this.$refs.dialog.save(this.selectedCategory)
    },
  },
}
</script>
