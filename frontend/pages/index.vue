<template>
    <v-container fluid class="fill-height bg-gray-lighten-4">
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" lg="6">
                <v-card color="#7d0c14" elevation="10" rounded="lg">
                    <p class="text-h5 font-weight-bold text-center text-white">NTC EVALUATION SYSTEM</p>
                    <p class="text-body-2 text-white opacity-80 text-center">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                    <v-container class="bg-white">
                        <p class="text-center text-h5">เข้าสู่ระบบ</p>
                        <v-alert v-if="error" type="error" varaint="tonal">{{ error }}</v-alert>
                        <v-form @submit.prevent="Login">
                            <v-text-field v-model="username" label="ชื่อผู้ใช้" prepend-inner-icon="mdi-account"></v-text-field>
                            <v-text-field v-model="password" type="password" label="รหัสผ่าน" prepend-inner-icon="mdi-lock"></v-text-field>
                            <v-select v-model="role" :items="g" label="ประเภทสมาชิก" prepend-inner-icon="mdi-account-group"></v-select>
                            <v-btn block color="#7d0c14" type="submit" class="text-white">เข้าสู่ระบบ</v-btn>
                            <center><nuxt-link to="/regis" class="text-blue ">สมัครสมาชิก</nuxt-link></center>
                        </v-form>
                    </v-container>
                </v-card>
                 <p class="text-center text-caption text-grey-darken-1 mt-6">
                    &copy; 2026 Nan Technical College Evaluation System
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import api from '../API/api';
definePageMeta({
    layout: false
})

const router = useRouter()
const error = ref('')
const username = ref('')
const password = ref('')
const role = ref('')
const g = ['ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล']

const Login = async () => {
    try{
        const res = await api.login({
            username: username.value,
            password: password.value,
            role: role.value,
        })

        localStorage.setItem("token",res.data.token)
        const useRole = res.data.role

        if(useRole === 'ฝ่ายบุคลากร') router.push('/Staff')
        else if(useRole === 'กรรมการประเมิน') router.push("/Committee")
        else if(useRole === 'ผู้รับการประเมินผล') router.push('/Evaluatee')

    }catch(err:any){
        console.error("Login Failed",err)
        error.value = err.response?.data?.message || "Login Failed!"
    }
}

</script>

<style scoped>
</style>