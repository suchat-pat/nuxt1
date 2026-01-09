<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class=" text-h5 font-weight-bold text-maroon">ดำเนินการประเมินผล</h1>
                    <v-table class="table mt-3">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="text-center border">ลำดับ</th>
                                <th class="text-center border">ชื่อ</th>
                                <th class="text-center border">นามสกุล</th>
                                <th class="text-center border">รอบการประเมิน</th>
                                <th class="text-center border">วันที่ออกแบบการประเมิน</th>
                                <th class="text-center border">สถานะการประเมิน</th>
                                <th class="text-center border">ดำเนินการประเมิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }}</td>
                                <td class="text-center border">{{ items.last_name }}</td>
                                <td class="text-center border">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border">{{ items.day_eva }}</td>
                                <td class="text-center border">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_commit === 'y' ? 'ประเมินสำเร็จ' : items.status_eva === 2 ? 'รอกรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                                <td class="text-center border">
                                    <v-btn v-if="items.status_commit === 'y'" color="green" class="text-white" size="small">ประเมินแล้ว</v-btn>
                                    <v-btn v-else color="blue" class="text-white" size="small"  @click="add(items.id_eva)">ประเมิน</v-btn>
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
import { useRouter } from 'vue-router';

const router = useRouter()
const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Commit'
const token = process.client ? localStorage.getItem('token') : null
const result = ref([])

const fetch = async () => {
    try{
       const res = await axios.get(`${api}/show_eva`,{headers:{Authorization: `Bearer ${token}`}})
       result.value = res.data 
       console.log("result : ",result.data)
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const add = (id_eva:number) => {
    router.push({path:`/Committee/Save_score${id_eva}`})
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