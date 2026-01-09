<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_commit === 'n'" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">ประเมินผู้รับการประเมินผล</h1>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-card class="pa-2">
                                <v-row v-for="(indicate,index2) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        <p>
                                            {{ index1+1 }}.{{ index2+1 }} {{ indicate.name_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} , คะแนนเต็ม : {{ indicate.point_indicate*4 }} , รายละเอียดตัวชี้วัด : {{ indicate.detail_indicate }}
                                        </p>
                                        <p>คำอธิบายเพิ่มเติม : {{ indicate.detail_eva || 'ไม่มี' }}</p>
                                        <p v-if="indicate.file_eva">ไฟล์ : <v-btn @click="view(indicate.file_eva)" size="small" color="blue">ดูไฟล์</v-btn></p>
                                        <p v-else>ไฟล์ : <span class="text-error">ไม่มีไฟล์</span></p>
                                        <v-select class="mt-2" label="ใส่คะแนนประเมิน 1-4" v-model="indicate.score" :items="[1,2,3,4]"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="mt-4">
                        <label for="">ข้อเสนอแนะ(ถ้ามี)</label>
                        <v-textarea label="คำอธิบายเพิ่มเติม" v-model="detail_commit" rows="2"></v-textarea>
                    </div>
                    <div class="text-center mt-5">
                        <v-btn color="success" type="submit">บันทึกคะแนน</v-btn><br><br><br><br>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_commit === 'y'" type="success">กรอกแบบประเมินล้ว</v-alert>
                <v-alert v-else type="warning">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
const id_eva = useRoute().params.id_eva
const user = ref({})
const topics = ref([])
const detail_commit = ref('')
const token = process.client ? localStorage.getItem('token') : null
const view = (filename:string) =>{
    const url = `http://localhost:3001/uploads/evadetail/${filename}`
    window.open(url,'_blank')
}
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Commit/save_score/user/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
        console.log('user:',user.value)
    }catch(err){
        console.error('Get User Error',err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Commit/save_score/indicate/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        console.log("Topics:",topics.value)
    }catch(err){
        console.error('Get Indicate Error',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})

const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i:any) =>{
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
            }
        })
    )
    if(allScore.some((s) => !s.score)){
        alert('กรุณากรอกคะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    formData.append('detail_commit',detail_commit.value)
    try{
        await axios.post(`http://localhost:3001/api/Commit/save_score/savescore/${id_eva}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('บันทึกคะแนนสำเร็จ')
        await Promise.all([fetchTopic(),fetchUser()])
        navigateTo('/Committee/Show_eva')
    }catch(err){
        console.error('Error POST Score',err)
    }
}
</script>

<style scoped>

</style>