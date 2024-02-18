<template>
  <div class="daily-bill">
    <Delete />
  </div>
</template>

<script>
import Delete from "./Delete.vue";
export default {
  components: { Delete },
  name: "DailyBill",
  props: {
    dark: {
      type: Boolean,
    },
  },
};
</script>

<style></style>
