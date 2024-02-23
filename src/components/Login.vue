<template>
  <div class="pa-4">
    <div>
      <v-icon large>mdi-chevron-left</v-icon>
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

<!-- <template>
  <v-form class="ma-6" v-model="form" @submit.prevent="onSubmit">
    <v-text-field
      v-model="username"
      class="mb-2"
      clearable
      label="用户名"
    ></v-text-field>

    <v-text-field
      v-model="password"
      clearable
      type="password"
      label="密码"
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
</template> -->

<script>
import { auth } from "@/api"
// import md5 from "js-md5"

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
    getToken(formData) {
      // const token = md5(formData.username + formData.password)
      const token = window.btoa(formData.username + ":" + formData.password)
      return token
    },
    onSubmit() {
      // console.log(md5("Hello"))
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
          console.log(res)
          // localStorage.setItem("token", token)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.isAlertShow = true
            localStorage.removeItem("token")
          }
        })
        .finally(() => {
          // this.$router.push("/")
          this.loading = false
        })
      // this.loading = false
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
  /* margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
}
</style>
