<template>
  <div>
    <v-tabs fixed-tabs height="60" class="mb-4" :dark="dark" v-model="tab">
      <v-tab>新增记账</v-tab>
      <v-tab>管理类别</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Add />
      </v-tab-item>
      <v-tab-item>
        <!-- <Delete /> -->
        <CategoryList />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Add from "@/components/Add.vue";
import Delete from "@/components/Delete.vue";
import CategoryList from "@/components/CategoryList.vue";
export default {
  name: "UpdateBill",
  components: {
    Add,
    Delete,
    CategoryList,
  },
  props: {
    dark: {
      type: Boolean,
    },
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style></style>
