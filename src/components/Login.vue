<template>
  <div class="pa-4">
    <div>
      <v-icon large @click="goBack">mdi-chevron-left</v-icon>
    </div>
    <v-alert :value="isAlertShow" class="mt-2" type="error" dense>
      账号或密码错误，请检查
    </v-alert>
    <div class="my-10 pt-6 text-h5">
      <p class="text-center">添加账号</p>
    </div>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              label="Username"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <div class="px-4 mt-2">
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          type="submit"
        >
          确认
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { auth } from "@/api"

export default {
  name: "Login",
  data: () => ({
    form: false,
    username: null,
    password: null,
    loading: false,
    isAlertShow: false,
  }),

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getToken(formData) {
      const token = window.btoa(formData.username + ":" + formData.password)
      return token
    },
    onSubmit() {
      if (!this.form) return
      const token = this.getToken({
        username: this.username,
        password: this.password,
      })
      localStorage.setItem("token", token)

      this.loading = true
      auth
        .verify()
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", token)
            this.$router.push("/")
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.isAlertShow = true
            // localStorage.removeItem("token")
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    required(v) {
      return !!v || "不能为空"
    },
  },
}
</script>

<style>
.login {
  width: 100%;
}
</style>
