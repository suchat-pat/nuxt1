<template>
    <v-container fluid class="fill-height bg-grey-lighten-4">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card elevation="10" rounded="lg" color="#7d0c14" class="pa-0">
                    <div class="text-center py-5">
                        <!-- <v-img src="/frontend//public/image/LOGO.png" width="60" class="mx-auto mb-2" /> -->
                        <h2 class="text-white text-h5 font-weight-bold">NTC EVALUATION SYSTEM</h2>
                        <p class="text-white">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                    </div>

                    <v-card flat class="bg-white pa-6">
                        <p class="text-center text-h5 font-weight-bold mb-4">เข้าสู่ระบบ</p>
                        
                        <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
                            {{ error }}
                        </v-alert>

                        <v-form @submit.prevent="Login">
                            <v-text-field v-model="username" label="ชื่อผู้ใช้" prepend-inner-icon="mdi-account" variant="outlined" />
                            <v-text-field v-model="password" type="password" label="รหัสผ่าน" prepend-inner-icon="mdi-lock" variant="outlined" />
                            <v-select v-model="role" :items="g" label="ประเภทผู้ใช้งาน" prepend-inner-icon="mdi-account-group" variant="outlined" />
                            
                            <v-btn block size="large" color="#7d0c14" type="submit" class="mt-2 text-white">
                                เข้าสู่ระบบ
                            </v-btn>
                        </v-form>

                        <div class="text-center mt-4">
                            <NuxtLink to="/regis" class="text-blue text-decoration-none">สมัครสมาชิก</NuxtLink>
                        </div>
                    </v-card>
                </v-card>
                 <p class="text-center text-caption text-grey-darken-1 mt-6">
                    &copy; 2025 Nan Technical College Evaluation System
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
// ใน Nuxt 3 ไม่ต้อง import ref, useRouter (Auto-import)
import api from '~/api/api'; 
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
    try {
        const res = await api.login({
            username: username.value,
            password: password.value,
            role: role.value,
        })
        
        // เก็บ Token
        localStorage.setItem('token', res.data.token)
        const useRole = res.data.role
        
        // การเปลี่ยนหน้า
        if (useRole === 'ฝ่ายบุคลากร') router.push('/Staff')
        else if (useRole === 'กรรมการประเมิน') router.push('/Committee')
        else if (useRole === 'ผู้รับการประเมินผล') router.push('/Evaluatee')
        
    } catch (err: any) {
        error.value = err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
    }
}
</script>