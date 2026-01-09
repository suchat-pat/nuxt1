<template>
    <v-app>
        <v-app-bar color="#7d0c14" class="py-2">
            <v-app-bar-nav-icon @click="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
            <v-toolbar-title>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</v-toolbar-title>
            <div>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} <br> {{ user.role }}</div>
            <v-btn class="bg-white" @click="logout">ออกจากระบบ</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
        </v-app-bar>
        <v-navigation-drawer color="#404040" v-model="drawer" app :temporary="isMobile" :permanent="!isMobile">
            <v-list>
                <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container fluid class="ma-2">
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref({})
// const token = process.client ? localStorage.getItem('token') : null
// if(token === null)navigateTo('/')
const roles = [
    //Staff
    {title:'หน้าหลัก',to:'/Staff/',role:'ฝ่ายบุคลากร'},
    {title:'จัดการผู้รับการประเมิน',to:'/Staff/ManageEva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการกรรมการประเมิน',to:'/Staff/ManageCommit',role:'ฝ่ายบุคลากร'},
    {title:'จัดการหัวข้อการประเมิน',to:'/Staff/Topic',role:'ฝ่ายบุคลากร'},
    {title:'จัดการตัวชี้วัด',to:'/Staff/Indicate',role:'ฝ่ายบุคลากร'},
    {title:'จัดการรอบการประเมิน',to:'/Staff/Round_eva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการแบบประเมิน',to:'/Staff/Eva',role:'ฝ่ายบุคลากร'},
    {title:'ผลสรุปการประเมินของผู้รับการประเมิน',to:'/Staff/Score_evaList',role:'ฝ่ายบุคลากร'},
    {title:'ผลสรุปการประเมินรายกรรมการ',to:'/Staff/Score_commitList',role:'ฝ่ายบุคลากร'},
    {title:'สถานะการประเมินของผู้รับการประเมิน',to:'/Staff/StatusEva',role:'ฝ่ายบุคลากร'},
    {title:'สถานะการประเมินของกรรมการ',to:'/Staff/StatusCommit',role:'ฝ่ายบุคลากร'},

    //Commit
    {title:'รายชื่อผู้รับการประเมิน',to:'/Committee/',role:'กรรมการประเมิน'},
    {title:'ดำเนินการประเมิน',to:'/Committee/Show_eva',role:'กรรมการประเมิน'},
    {title:'ตรวจสอบและยืนยันผล',to:'/Committee/Check_confirm',role:'กรรมการประเมิน'},

    //Eva
    {title:'หน้าหลัก',to:'/Evaluatee/',role:'ผู้รับการประเมินผล'},
    {title:'แก้ไขข้อมูลส่วนตัว',to:'/Evaluatee/Edit_eva',role:'ผู้รับการประเมินผล'},
    {title:'แบบประเมินตนเอง',to:'/Evaluatee/Selfeva',role:'ผู้รับการประเมินผล'},
    {title:'ตรวจสอบคะแนนประเมิน',to:'/Evaluatee/Check_score',role:'ผู้รับการประเมินผล'},
    {title:'รายงานผล',to:'/Evaluatee/Report_eva',role:'ผู้รับการประเมินผล'},
]
const navitem = computed(() =>
    roles.filter((item) => item.role.includes(user.value.role))
)
const logout = async () =>{
    if(!confirm('ต้องการออกจากระบบใช่หรือไม่'))return
    localStorage.removeItem('token')
    navigateTo('/')
}
const fetchUser = async () =>{
    const token = localStorage.getItem('token') || null
    if(!token){
        return await navigateTo('/', { replace: true })
    }
    try{
        const res = await axios.get(`http://localhost:3001/api/profile`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('error GET Profile',err)
    }
}
onMounted(fetchUser)
</script>

<style scoped>
@media print {
    /* ซ่อนปุ่มและ Navbar ของ Vuetify */
    .d-print-none,
    .v-app-bar, 
    .v-navigation-drawer {
        display: none !important;
    }

    /* ปรับ Layout ให้เต็มหน้ากระดาษ */
    .v-main {
        padding: 0px !important;
        margin: 0px !important;
        width: 100vw !important;
    }

    /* ปรับ Container ให้ไม่เหลือขอบขาวเยอะเกินไป */
    /* .v-container {
        padding: 0 !important;
        max-width: 100% !important;
    } */
    
    /* ตั้งค่าหน้ากระดาษ */
    /* @page {
        size: auto;
        margin: 10mm;
    } */
}
</style>