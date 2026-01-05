<template>
    <v-app>
        <v-app-bar color="#7d0c14" class="py-2">
            <v-app-bar-nav-icon @click="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
            <v-toolbar-title>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</v-toolbar-title>
            <div>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} <br> {{ user.role }}</div>
            <v-btn class="bg-white" @click="logout">ออกจากระบบ</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
        </v-app-bar>
        <v-navigation-drawer color="#4A4A4A" v-model="drawer" app :temporary="isMobile" :permanent="!isMobile">
            <v-list>
                <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref({})
</script>

<style scoped>

</style>