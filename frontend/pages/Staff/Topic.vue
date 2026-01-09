<template>
    <v-container fluid class=" py-10 bg-lighten-4">
                <v-card elevation="10">
                    <v-sheet class="pa-6 text-center">
                        <h1 class="text-h5 font-weight-bold mb-2 text-maroon">จัดการหัวข้อการประเมิน</h1>
                    </v-sheet>

                    <v-card-text class="pa-6">
                        <v-form @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field label="ชื่อ" v-model="form.name_topic" :error-messages="error.name_topic"></v-text-field>
                                </v-col>
                                <v-row>
                                    <v-col cols="6" md="6"><v-btn block color="blue" type="submit">{{ form.id_topic ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
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
                                <th class="text-center border pa-2">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_topic">
                                <td class="text-center border pa-2">{{ index+1 }}</td>
                                <td class="text-center border pa-2">{{ items.name_topic }}</td>
                                <td class="text-center border pa-2">
                                    <v-btn color="warning" class="text-white" @click="edit(items)" size="small">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" @click="del(items.id_topic)" size="small">ลบ</v-btn>
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
    id_topic:'',
    name_topic:'',
})

const reset = () => {
    form.value = {
        id_topic: null,
        name_topic: '',
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/topic`,{headers : {Authorization : `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})
function vaildateFrom(){
    error.value = {}
    const f = form.value
    if(!f.name_topic)error.value.name_topic='กรุณากรอกชื่อหัวข้อการประเมิน'
    return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
    if(!vaildateFrom())return
    try{
        if(form.value.id_topic){
            await axios.put(`${staff}/topic/${form.value.id_topic}`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }else{
            await axios.post(`${staff}/topic`,form.value,{headers: {Authorization:`Bearer ${token}`}})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_topic:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/topic/${id_topic}`,{headers:{Authorization:`Bearer ${token}`}})
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