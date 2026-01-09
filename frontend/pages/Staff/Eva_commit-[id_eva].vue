<template>
    <v-container fluid class=" py-10 bg-lighten-4">
                <v-card elevation="10">
                    <v-sheet class="pa-6 text-center">
                        <h1 class="text-h5 font-weight-bold mb-2 text-maroon">เพิ่มกรรมการ</h1>
                        <p class="font-weight-bold">ข้อมูลผู้ถูกประเมิน</p>
                        <small class="text-gray-lighten-1">ชื่อ-นามสกุล : {{ header.first_name }} {{ header.last_name }}</small><br>
                        <small class="text-gray-lighten-1">ชื่อ-นามสกุล : รอบการประเมินที่ {{ header.round_sys }} ปี {{ header.year_sys }}</small>
                    </v-sheet>

                    <v-card-text class="pa-6">
                        <v-form @submit.prevent="saveMember">
                            <v-row class="">
                                <template v-for="(c,index) in List" :key="index">
                                    <v-col cols="12" md="6">
                                        <v-select v-model="c.id_member" :label="`กรรมการคนที่ ${index+1}`" :items="MEMBER(index).map(m => ({ title: m.fullname_commit , value: m.id_member }))" />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="c.role" :label="`ตำแหน่งกรรมการคนที่ ${index+1}`" :items="ROLE(index)" />
                                    </v-col>
                                </template>
                                <v-row>
                                    <v-col cols="12" md="12"><v-btn block color="blue" type="submit">บันทึก</v-btn></v-col>
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-table class="mb-4 table pa-2">
                        <thead>
                            <tr class="bg-gray">
                                <th class="text-center border pa-2">ลำดับ</th>
                                <th class="text-center border pa-2">กรรมการ</th>
                                <th class="text-center border pa-2">ตำแหน่ง</th>
                                <th class="text-center border pa-2">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in List" :key="items.id_commit">
                                <td class="text-center border pa-2">{{ index+1 }}</td>
                                <td class="text-center border pa-2">{{ nameOf(items.id_member) }}</td>
                                <td class="text-center border pa-2">{{ items.role }}</td>
                                <td class="text-center border pa-2">
                                    <v-btn color="error" class="text-white" @click="del(items.id_commit)" size="small">ลบ</v-btn>
                                </td>
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
const id_eva = useRoute().params.id_eva
const people = ref([])
const header = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    { id_commit:null,id_member:'',role:'' },
    { id_commit:null,id_member:'',role:'' },
    { id_commit:null,id_member:'',role:'' },
])

const fetch = async () => {
    try{
        const h = await axios.get(`${staff}/commit/header/${id_eva}`,{headers : {Authorization: `Bearer ${token}`}})
        header.value = h.data[0]
        const res = await axios.get(`${staff}/commit/${id_eva}`,{headers : {Authorization : `Bearer ${token}`}})
        people.value = res.data.before
        const useData = res.data.after
        if(useData.length === 0){
            List.value = [
                { id_commit:null,id_member:'',role:'' },
                { id_commit:null,id_member:'',role:'' },
                { id_commit:null,id_member:'',role:'' },
            ]
        }else{
            List.value = useData.map(c => ({
                id_commit:c.id_commit,id_member:c.id_member,role:c.role
            }))
            while(List.value.length < 3){
                List.value.push({id_commit:null,id_member:'',role:''})
            }
        }
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const nameMap = computed( () => Object.fromEntries(people.value.map(p => [p.id_member,p.fullname_commit])) )
const nameOf = (id:number) => nameMap.value[id]

const MEMBER = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null ) )
    return people.value.filter( (p) => !picked.includes(p.id_member) )
}

const ROLE = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.role : null) )
    return role.filter( (p) => !picked.includes(p) )
}

const saveMember = async () =>{
    try{
        await axios.post(`${staff}/commit/${id_eva}`,List.value,{headers: {Authorization : `Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_commit:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${staff}/commit/${id_commit}`,{headers:{Authorization:`Bearer ${token}`}})
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