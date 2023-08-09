<template>
  <v-form>
    <v-container>
      <v-card class="mx-auto px-4 py-8" max-width="364">
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="用户名"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            type="password"
            label="密码"
            placeholder="Enter your password"
          ></v-text-field>
          <br />
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="primary"
            size="large"
            type="submit"
            variant="elevated"
          >
            确认
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import md5 from "js-md5"
export default {
  name: "Login",
  data: () => ({
    form: false,
    username: null,
    password: null,
    loading: false,
  }),

  methods: {
    getToken(formData) {
      const token = md5(formData.username + formData.password)
      return token
    },
    onSubmit() {
      console.log(md5("Hello"))
      if (!this.form) return
      const token = this.getToken({
        username: this.username,
        password: this.password,
      })
      localStorage.setItem("token", token)

      //   this.loading = true
      //   setTimeout(() => (this.loading = false), 2000)
    },
    required(v) {
      return !!v || "不能为空"
    },
  },
}
</script>

<style></style>
