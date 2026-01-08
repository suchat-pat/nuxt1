<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">คะแนนประเมินตนเอง</h1>
                    <v-card class="pa-2 mt-2">
                        <p>ชื่อ - นามสกุล : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">รายละเอียด</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">ไฟล์ที่แนบ</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-2 text-center">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-2 text-center"><v-btn v-if="indicate.file_eva" @click="view(indicate.file_eva)" color="success">ดูไฟล์</v-btn> <span v-else class="text-error">ไม่มีไฟล์</span></td>
                                    <td class="border pa-2 text-center">{{ indicate.score_member*indicate.point_indicate }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-form>
                
                <v-alert v-else-if="user.status_eva === 1" type="info">คุณยังไม่ได้ประเมินตนเอง</v-alert>
                <v-alert v-else type="warning">คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

const user = ref({})
const topics = ref([])
const token = process.client ? localStorage.getItem('token') : null

const view = (filename:string) =>{
    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,'_blank')
}
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/score_member/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('Get User Error',err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/score_member/indicate`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        // console.log("Topic:",topic.value)
    }catch(err){
        console.error('Get Indicate Error',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})

</script>

<style scoped>

</style>