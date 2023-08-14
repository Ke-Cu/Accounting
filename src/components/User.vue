<template>
  <div>
    <v-row justify="space-around" class="my-6">
      <v-avatar color="pink" size="70">
        <v-icon x-large dark> mdi-account-circle </v-icon>
      </v-avatar>
    </v-row>
    <v-row>
      <Login />
    </v-row>
  </div>
</template>

<script>
import Login from "./Login.vue"
export default {
  name: "User",
  components: {
    Login,
  },
}
</script>

<style></style>
