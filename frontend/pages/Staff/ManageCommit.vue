<template>
    <v-container fluid class=" py-10 bg-lighten-4">
                <v-card elevation="10">
                    <v-sheet class="pa-6 text-center">
                        <h1 class="text-h5 font-weight-bold mb-2 text-maroon">จัดการกรรมการประเมิน</h1>
                    </v-sheet>

                    <v-card-text class="pa-6">
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อ" v-model="form.first_name" :error-messages="error.first_name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="นามสกุล" v-model="form.last_name" :error-messages="error.last_name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field label="อีเมล" v-model="form.email" :error-messages="error.email"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อผู้ใช้" v-model="form.username" :error-messages="error.username"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="รหัสผ่าน" type="password" v-model="form.password" :error-messages="error.password"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select label="เลือกประเภทสมาชิก" v-model="form.role" :items="['กรรมการประเมิน']" :error-messages="error.role"></v-select>
                                </v-col>
                                <v-row>
                                    <v-col cols="6" md="6"><v-btn block color="blue" type="submit">{{ form.id_member ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                                    <v-col cols="6" md="6"><v-btn  block color="#7d0c14" type="reset">ยกเลิก</v-btn></v-col>
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-table class="mb-4 table pa-2">
                        <thead>
                            <tr class="bg-gray">
                                <th class="text-center border pa-2">ลำดับ</th>
                                <th class="text-center border pa-2">ชื่อ - นามสกุล</th>
                                <th class="text-center border pa-2">อีเมล</th>
                                <th class="text-center border pa-2">ชื่อผู้ใช้</th>
                                <th class="text-center border pa-2">ประเภทสมาชิก</th>
                                <th class="text-center border pa-2">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_member">
                                <td class="text-center border pa-2">{{ index+1 }}</td>
                                <td class="text-center border pa-2">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border pa-2">{{ items.email }}</td>
                                <td class="text-center border pa-2">{{ items.username }}</td>
                                <td class="text-center border pa-2">{{ items.role }}</td>
                                <td class="text-center border pa-2">
                                    <v-btn color="warning" class="text-white" @click="edit(items)" size="small">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" @click="del(items.id_member)" size="small">ลบ</v-btn>
                                </td>
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center text-gray border" colspan="8">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {staff,api} from '../../API/base'
const token = process.client ? localStorage.getItem('token') : null
const result = ref([])

const form = ref({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/member/commit`,{headers : {Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})
const emailReget = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i
function vaildateFrom(){
    error.value = {}
    const f = form.value
    if(!f.first_name.trim())error.value.first_name='กรุณากรอกชื่อ'
    if(!f.last_name.trim())error.value.last_name='กรุณากรอกนามสกุล'
    if(!f.email.trim())error.value.email='กรุณากรอกอีเมล'
    else if(!emailReget.test(f.email.trim()))error.value.email='รูปแบบอีเมลไม่ถูกต้อง'
    if(!f.username.trim())error.value.username='กรุณากรอกชื่อผู้ใช้'
    else if(f.username.trim().length < 4)error.value.username='ต้องมีอย่างน้อย 4 ตัวอักษร'
    if(!f.role.trim())error.value.role='กรุณาเลือกประเภทสมาชิก'
    return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
    if(!vaildateFrom())return
    try{
        const payload = {
            id_member: form.value.id_member,
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            email: form.value.email,
            username: form.value.username,
            role: form.value.role,
            ...(form.value.password ? {password: form.value.password} : {})
        }
        if(form.value.id_member){
            await axios.put(`${staff}/member/${form.value.id_member}`,payload,{headers: {Authorization:`Bearer ${token}`}})
        }else{
            await axios.post(`http://localhost:3001/api/auth/regis`,{...payload,password:form.value.password})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_member:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/member/${id_member}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
    }catch(err){
        console.error('Error Delete',err)
    }
}

onMounted(fetch)
</script>

<style scoped>
.text-maroon{
    color: #7d0c14;
}
</style>