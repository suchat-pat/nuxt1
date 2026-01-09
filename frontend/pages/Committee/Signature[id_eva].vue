<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class=" text-h5 font-weight-bold text-maroon">ตรวจสอบและยืนยันผล</h1>
                    <v-form v-if="!result.signature" @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="12">
                                <v-file-input v-model="file" label="ไฟล์"  accept=".doc,.docx,.pdf,.txt,image/*"/>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn class="text-white w-full" color="blue" type="submit">บันทึก</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
                                <v-btn class="text-white w-full" color="error" type="reset">ยกเลิก</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                    <v-table v-else class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="text-center border">ลำดับ</th>
                                <th class="text-center border">ไฟล์</th>
                                <th class="text-center border">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center border">1.</td>
                                <td class="text-center border">{{ result.signature }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-white" color="warning" size="small" @click="view(result.signature)">เปิดดู</v-btn>&nbsp;&nbsp;
                                    <v-btn color="error" class="text-white" size="small"  @click="del(id_eva)">ลบ</v-btn>
                                </td>
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center border text-gray-500" colspan="7">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';

const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Commit'
const token = process.client ? localStorage.getItem('token') : null
const id_eva = useRoute().params.id_eva
const result = ref([])
const name_doc = ref('')
const file = ref<File | null>(null)

const fetch = async () => {
    try{
       const res = await axios.get(`${api}/signature/${id_eva}`,{headers:{Authorization: `Bearer ${token}`}})
       result.value = res.data 
    }catch(err){
        console.error('Error Fetching',err)
    }
}


const saveMember = async () =>{
    try{
        const formData = new FormData()
        formData.append("file",file.value)
        await axios.post(`${api}/signature/${id_eva}`,formData,{headers:{Authorization: `Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_doc:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/signature/${id_eva}`,{headers:{Authorization: `Bearer ${token}`}})
        await fetch()
    }catch(err){
        console.error('Error Delete',err)
    }
}

const view = (filename:string) => {
    const url = `http://localhost:3001/uploads/signature/${filename}`
    window.open(url,'_blank')
}

onMounted(fetch)
</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>