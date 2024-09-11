<script setup>
import TableVuetify from './TableVuetify.vue';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import { UserGroupIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>
<template>
        <router-link to="/admin/dashboard" >
            <v-btn variant="outlined" color="primary">
                <ChevronLeftIcon class="h-6 w-6 text-blue-600 mr-1" /> Back
        </v-btn>
        </router-link>
        <div class="mt-4 bg-white h-full w-full rounded-lg shadow">
  <!-- Table -->
  <div class="flex gap-2 bg-slate-100 text-center rounded-t-lg py-4 px-4 items-center">
  <UserGroupIcon class="h-6 w-6 text-blue-600"/>
  <h1 class="font-bold text-xl text-blue-600">User Management</h1>
  <!-- <Breadcrumbs/> -->
  </div>
  <hr class="w-full">
  <div class="px-4">
  <TableVuetify/>
</div>
  <!-- Edit -->
</div>
</template>
