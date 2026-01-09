<template>
    <v-container fluid class=" py-10 bg-lighten-4">
                <v-card elevation="10">
                    <v-sheet class="pa-6 text-center">
                        <h1 class="text-h5 font-weight-bold mb-2 text-maroon">จัดการรอบการประเมิน</h1>
                    </v-sheet>

                    <v-card-text class="pa-6">
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="วันที่เปิดรอบการประเมิน" type="date" v-model="form.day_open" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="วันที่ปิดรอบการประเมิน" type="date" v-model="form.day_out" />
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select label="รอบการประเมิน" v-model="form.round_sys" :items="[{title:'รอบที่ 1',value:'1'},{title:'รอบที่ 2',value:'2'}]" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field type="number" label="ปี" v-model="form.year_sys" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="form.status_sys" :items="[{title:'เปิด',value:'y'},{title:'ปิด',value:'n'}]" label="สถานะ เปิด/ปิด รอบการประเมิน" />
                                </v-col>
                                <v-row>
                                    <v-col cols="6" md="6"><v-btn block color="blue" type="submit">{{ form.id_sys ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                                    <v-col cols="6" md="6"><v-btn  block color="#7d0c14" type="reset">ยกเลิก</v-btn></v-col>
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-table class="mb-4 table pa-2">
                        <thead>
                            <tr class="bg-gray">
                                <th class="text-center border pa-2">ลำดับ</th>
                                <th class="text-center border pa-2">วันที่เปิดรอบการประเมิน</th>
                                <th class="text-center border pa-2">วันที่ปิดรอบการประเมิน</th>
                                <th class="text-center border pa-2">รอบการประเมิน</th>
                                <th class="text-center border pa-2">สถานะ เปิด/ปิด รอบการประเมิน</th>
                                <th class="text-center border pa-2">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_sys">
                                <td class="text-center border pa-2">{{ index+1 }}</td>
                                <td class="text-center border pa-2">{{ items. day_open }}</td>
                                <td class="text-center border pa-2">{{ items.day_out }} <br> <small class="text-gray">{{ items.detail_indicate }}</small></td>
                                <td class="text-center border pa-2">รอบการประเมินที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border pa-2">{{ items.status_sys === 'y' ? 'เปิด' : "ปิด" }}</td>
                                <td class="text-center border pa-2">
                                    <v-btn color="warning" class="text-white" @click="edit(items)" size="small">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" @click="del(items.id_sys)" size="small">ลบ</v-btn>
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
    id_sys: null,
    day_open:'',
    day_out:'',
    round_sys:'',
    year_sys:'',
    status_sys:'',
})

const reset = () => {
    form.value = {
        id_sys: null,
        day_open:'',
        day_out:'',
        round_sys:'',
        year_sys:'',
        status_sys:'',
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/round_eva`,{headers : {Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_sys){
            await axios.put(`${staff}/round_eva/${form.value.id_sys}`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }else{
            await axios.post(`${staff}/round_eva`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_sys:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/round_eva/${id_sys}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()
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