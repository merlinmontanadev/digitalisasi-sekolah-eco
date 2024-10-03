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
import { DocumentCheckIcon, FolderIcon, TagIcon, BuildingOfficeIcon, ClockIcon, UserGroupIcon } from "@heroicons/vue/24/solid";
import { mapState } from 'vuex'; // Jika Anda menggunakan Vuex untuk state management

export default {
  data() {
    return {
      rawData: [
        {
          label: "btnQA1",
          link: "#",
          icon: DocumentCheckIcon
        },
        {
          label: "btnQA2",
          link: "#",
          icon: FolderIcon
        },
        {
          label: "btnQA3",
          link: "#",
          icon: TagIcon
        },
        {
          label: "btnQA4",
          link: "#",
          icon: UserGroupIcon
        },
        {
          label: "btnQA5",
          link: "#",
          icon: BuildingOfficeIcon
        },
        {
          label: "btnQA6",
          link: "#",
          icon: ClockIcon
        }
      ]
    };
  },
  computed: {
    data() {
      // Ganti label dengan terjemahan
      return this.rawData.map(item => ({
        ...item,
        label: this.$t(item.label) // Menggunakan $t dari i18n
      }));
    }
  }
};
</script>
