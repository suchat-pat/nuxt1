<template>
    <v-container fluid class=" py-10 bg-lighten-4">
                <v-card elevation="10">
                    <v-sheet class="pa-6 text-center">
                        <h1 class="text-h5 font-weight-bold mb-2 text-maroon">จัดการแบบประเมิน</h1>
                    </v-sheet>

                    <v-card-text class="pa-6">
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="วันที่ออกแบบประเมิน" type="date" v-model="form.day_eva" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select label="ผู้รับการประเมิน" v-model="form.id_member" :items="member.map(m => ({ title: `${m.first_name} ${m.last_name}`,value:m.id_member }))" />
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select label="รอบการประเมิน" v-model="form.id_sys" :items="round.map(r => ({ title: `รอบการประเมินที่ ${r.round_sys} ปี ${r.year_sys}`,value: r.id_sys }))" />
                                </v-col>
                                <v-row>
                                    <v-col cols="6" md="6"><v-btn block color="blue" type="submit">{{ form.id_eva ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                                    <v-col cols="6" md="6"><v-btn  block color="#7d0c14" type="reset">ยกเลิก</v-btn></v-col>
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-table class="mb-4 table pa-2">
                        <thead>
                            <tr class="bg-gray">
                                <th class="text-center border pa-2">ลำดับ</th>
                                <th class="text-center border pa-2">ผู้รับการประเมิน</th>
                                <th class="text-center border pa-2">รอบการประเมิน</th>
                                <th class="text-center border pa-2">วันที่ออกแบบประเมิน</th>
                                <th class="text-center border pa-2">สถานะการประเมิน</th>
                                <th class="text-center border pa-2">จัดการ</th>
                                <th class="text-center border pa-2">เพิ่มกรรมการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_sys">
                                <td class="text-center border pa-2">{{ index+1 }}</td>
                                <td class="text-center border pa-2">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border pa-2">รอบการประเมินที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border pa-2">{{ items.day_eva }}</td>
                                <td class="text-center border pa-2">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                                <td class="text-center border pa-2">
                                    <v-btn color="warning" class="text-white" @click="edit(items)" size="small">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" @click="del(items.id_eva)" size="small">ลบ</v-btn>
                                </td>
                                <td class="text-center border pa-2">
                                    <v-btn color="success" class="text-white" @click="go(items.id_eva)" size="small">เพิ่มกรรมการ</v-btn>&nbsp;
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
const round = ref([])
const member = ref([])

const form = ref({
    id_eva: null,
    day_eva:'',
    id_member:'',
    id_sys:'',
})

const reset = () => {
    form.value = {
        id_eva: null,
        day_eva:'',
        id_member:'',
        id_sys:'',
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const r = await axios.get(`${staff}/eva/round`,{headers : {Authorization: `Bearer ${token}`}})
        round.value = r.data
        const e = await axios.get(`${staff}/member/eva`,{headers : {Authorization: `Bearer ${token}`}})
        member.value = e.data
        const res = await axios.get(`${staff}/eva`,{headers : {Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_eva){
            await axios.put(`${staff}/eva/${form.value.id_sys}`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }else{
            await axios.post(`${staff}/eva`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_eva:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/eva/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()
    }catch(err){
        console.error('Error Delete',err)
    }
}

const go = (id_eva:number) => {
    navigateTo({path:`Eva_commit-${id_eva}`})
}

onMounted(fetch)
</script>

<style scoped>
.text-maroon{
    color: #7d0c14;
}
</style>