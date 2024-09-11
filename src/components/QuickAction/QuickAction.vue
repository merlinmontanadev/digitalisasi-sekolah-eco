<script setup>
import { DocumentCheckIcon, FolderIcon, TagIcon, BuildingOfficeIcon, ClockIcon, UserGroupIcon } from "@heroicons/vue/24/solid";
const data = 
[{
  label: "Nilai",
  link: "/admin",
  icon: DocumentCheckIcon
},
{
  label: "Mata Pelajaran",
  link: "/admin/manajemen-pengguna",
  icon: FolderIcon
},
{
  label: "Pelanggaran",
  link: "#",
  icon: TagIcon
},
{
  label: "Kelas",
  link: "#",
  icon: UserGroupIcon
},
{
  label: "Bursa Kerja Khusus" ,
  link: "#",
  icon: BuildingOfficeIcon
},
{
  label: "Absensi" ,
  link: "#",
  icon: ClockIcon
}
]
</script>
<template>
<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 mt-4">
  <div v-for="(item, index) in data" :key="index">
    <router-link :to="item.link">
      <div class="rounded shadow-md md:col-span-1 flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400">
        <div class="px-6 py-6">
          <div class="flex font-bold text-lg text-white text-center">
            <component 
              :class="['h-6 w-6 text-white mr-2']" 
              :is="item.icon"
              v-if="item.icon"
            />
            {{ item.label }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>
<script>
</script>

