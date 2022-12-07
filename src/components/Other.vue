<template>
    <v-container class="pa-10" :dark="dark">
        <v-row>
            <v-col>
                <v-text-field label="用户名" v-model="username" :dark="dark" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field label="密码" v-model="password" type="password" :dark="dark" />
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col>
                <v-btn class="px-8 py-5" @click="login" :dark="dark">
                    登录
                </v-btn>
            </v-col>
            <v-col>
                <v-btn class="px-8 py-5" @click="register" :dark="dark">
                    注册
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    props: {
        dark: {
            type: Boolean,
        }
    },
    data: () => ({
        username: '',
        password: '',
    }),
    methods: {
        login() {
            // 执行登录操作
        },
        register() {
            // 执行注册操作
        },
    },
}
</script>
  