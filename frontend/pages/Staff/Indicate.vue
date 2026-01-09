<template>
    <v-container fluid class=" py-10 bg-lighten-4">
                <v-card elevation="10">
                    <v-sheet class="pa-6 text-center">
                        <h1 class="text-h5 font-weight-bold mb-2 text-maroon">จัดการตัวชี้วัด</h1>
                    </v-sheet>

                    <v-card-text class="pa-6">
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select label="หัวข้อการประเมิน" :items="topic.map(t => ({ title: t.name_topic , value: t.id_topic }))" v-model="form.id_topic" :error-messages="error.id_topic" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อตัวชี้วัด" v-model="form.name_indicate" :error-messages="error.name_indicate" />
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-textarea label="รายละเอียด" rows="3" v-model="form.detail_indicate" :error-messages="error.detail_indicate" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="form.point_indicate" :items="[1,2,3,4,5]" label="น้ำหนักคะแนน" :error-messages="error.point_indicate" />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="form.check_indicate" :items="[{title:'มี',value:'y'},{title:'ไม่มี',value:'n'}]" label="ลักษณะตัวเลือกคะแนน" :error-messages="error.check_indicate" />
                                </v-col>
                                <v-row>
                                    <v-col cols="6" md="6"><v-btn block color="blue" type="submit">{{ form.id_indicate ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                                    <v-col cols="6" md="6"><v-btn  block color="#7d0c14" type="reset">ยกเลิก</v-btn></v-col>
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-table class="mb-4 table pa-2">
                        <thead>
                            <tr class="bg-gray">
                                <th class="text-center border pa-2">ลำดับ</th>
                                <th class="text-center border pa-2">หัวข้อการประเมิน</th>
                                <th class="text-center border pa-2">ตัวชี้วัด</th>
                                <th class="text-center border pa-2">น้ำหนักคะแนน</th>
                                <th class="text-center border pa-2">ลักษณะตัวเลือกคะแนน</th>
                                <th class="text-center border pa-2">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_indicate">
                                <td class="text-center border pa-2">{{ index+1 }}</td>
                                <td class="text-center border pa-2">{{ items.name_topic }}</td>
                                <td class="text-center border pa-2">{{ items.name_indicate }} <br> <small class="text-gray">{{ items.detail_indicate }}</small></td>
                                <td class="text-center border pa-2">{{ items.point_indicate }}</td>
                                <td class="text-center border pa-2">{{ items.check_indicate === 'y' ? 'มี' : "ไม่มี" }}</td>
                                <td class="text-center border pa-2">
                                    <v-btn color="warning" class="text-white" @click="edit(items)" size="small">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" @click="del(items.id_indicate)" size="small">ลบ</v-btn>
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
const topic = ref([])

const form = ref({
    id_indicate: null,
    id_topic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
})

const reset = () => {
    form.value = {
        id_indicate: null,
        id_topic:'',
        name_indicate:'',
        detail_indicate:'',
        point_indicate:'',
        check_indicate:'',
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const t = await axios.get(`${staff}/topic`,{headers : {Authorization : `Bearer ${token}`}})
        topic.value = t.data
        const res = await axios.get(`${staff}/indicate`,{headers : {Authorization : `Bearer ${token}`}})
        result.value = res.data
        console.log('[]',result.value)
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})
function vaildateFrom(){
    error.value = {}
    const f = form.value
    if(!f.id_topic)error.value.id_topic='กรุณาเลือกหัวข้อการประเมิน'
    if(!f.name_indicate)error.value.name_indicate='กรุณากรอกชื่อตัวชี้วัด'
    if(!f.detail_indicate)error.value.detail_indicate='กรุณากรอกรายละเอียด'
    if(!f.point_indicate)error.value.point_indicate='กรุณาเลือกน้ำหนักคะแนน'
    if(!f.check_indicate)error.value.check_indicate='กรุณาเลือกลักษณะตัวเลือกคะแนน'
    return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
    if(!vaildateFrom())return
    try{
        if(form.value.id_indicate){
            await axios.put(`${staff}/indicate/${form.value.id_indicate}`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }else{
            await axios.post(`${staff}/indicate`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_indicate:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/indicate/${id_indicate}`,{headers:{Authorization:`Bearer ${token}`}})
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