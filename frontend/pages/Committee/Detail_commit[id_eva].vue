<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_commit === 'y'">
                    <h1 class="text-h5 font-weight-bold">คะแนนกรรมการประเมิน</h1>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">รายละเอียด</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="border pa-2 bg-grey" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-2 text-center">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-2 text-center">{{ indicate.score_commit*indicate.point_indicate }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <v-card class="pa-2 mt-4 text-end" color="success">คะแนนรวมสุทธิ {{ totalScore.toFixed(2) || 0 }} คะแนน&nbsp;&nbsp;&nbsp;&nbsp;</v-card>
                </v-form>
                
                <v-alert v-else-if="user.status_commit === 'n'" type="info">ยังไม่ได้ประเมินผู้รับการประเมิน</v-alert>
                <v-alert v-else type="warning">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
const id_eva = useRoute().params.id_eva
console.log("id_eva:",id_eva)
const user = ref({})
const topics = ref([])
const token = process.client ? localStorage.getItem('token') : null
const totalScore = ref(0)

const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Commit/detail_commit/user/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('Get User Error',err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Commit/detail_commit/indicate/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        res.data.forEach(score =>
            score.indicates.forEach(i =>{
                totalScore.value += (i.score_commit * i.point_indicate) /3
            })
        )
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