<script>
import SideItem from './SideItem.vue';
import { computed, onMounted } from 'vue';
import { HomeIcon, UserGroupIcon, ClockIcon, CircleStackIcon, Cog6ToothIcon, TagIcon, BuildingOfficeIcon, ArrowLeftStartOnRectangleIcon} from "@heroicons/vue/24/outline"
import { logoutUser } from '@/services/auth/auth.js';
import { useToast } from "vue-toastification";
import Cookies from 'js-cookie';
import mediumZoom from 'medium-zoom'

export default {
  props: {
    isSidebarVisible: Boolean,
    user: {
      type: Object,
      required: true
    },
    userFile: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      toast: useToast(),  
  }
},
  setup() {
    const toast = useToast();
    const zoomImage = ref(null);
    onMounted(() => {
      if (zoomImage.value) {
        mediumZoom(zoomImage.value, {
          // Optional: Add your desired configuration options here
        });
      }
    });
    return {
      toast,
      zoomImage,
    };
  },
  methods: {
    upper(string) {
      return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    },
    async logout() {
      try {
        await logoutUser();
        Cookies.remove('auth');
        this.toast.info("Logout Berhasil");
        this.$router.push('/login')  
      } catch (error) {
        if(error.response){
          console.log(error.response.data.message)
        }
      }
    },
  },
  components: {
    SideItem
  }
};
</script>
<template>
<!-- start: Sidebar -->
<div  :class="`${isSidebarVisible ? '-translate-x-full' : 'translate-x-0'}`" class="fixed mt-16 sidebardw top-0 left-0 bg-white w-64 h-full shadow-xl transition-transform ">
  <!-- Side item section with scrollbar -->
  <!--Start: Proffil-->
  <div class="border-b py-4 px-4 border-gray-200">
    <div class="container mx-auto">
      <div class="flex flex-col justify-center items-center">
    <Suspense>
    <template #default>
      <div class="flex flex-col justify-center items-center">
        <div v-if="loading" class="h-32 w-32 rounded-full shadow-md bg-gray-200">
        <div class="animate-pulse">
          <div className="w-32 h-32 object-cover rounded-full border border-gray-300 bg-gray-300 mb-2">&nbsp;</div>
        </div>
        </div>
        
        <div v-else>
        <div class="h-32 w-32 rounded-full shadow-md">
          <img ref="zoomImage" :src="userFile" className="w-32 h-32 object-cover rounded-full border border-gray-200 mb-2"/>
        </div>
        </div>

        <div class="py-1 flex flex-col justify-center items-center">
          <div class="text-lg font-bold bg-gradient-to-r from-blue-700 via-green-500 to-blue-500 inline-block text-transparent bg-clip-text">SMK Dharma Wirawan</div>
          <!-- <div class="flex items-center text-center justify-center"> -->
          
            <div v-if="loading" class="w-full rounded-md bg-gray-200 h-full">
            <div class="animate-pulse">
              <div class="bg-gray-300 rounded w-full text-lg">&nbsp;</div>
            </div>
          </div>
          <div v-else>
            <div class="text-lg font-semibold">
            {{ upper(user?.username) }} 
          </div>
        </div>
          <!-- </div> -->
          <div class="flex ">
          <router-link :to="`/admin/manajemen-pengguna/edit/user/${user?.user_id}`" >
            <button class="font-semibold text-sm mt-2 flex bg-blue-700 text-white px-4 py-2 rounded-l-md">
            <UserIcon class="mr-2 h-5 w-5 text-white"></UserIcon> Profile
          </button>
          </router-link>
          <button @click="logout" class="font-semibold text-sm mt-2 flex bg-red-500 text-white px-4 py-2 rounded-r-md"><ArrowLeftStartOnRectangleIcon class="mr-2 h-5 w-5 text-white"></ArrowLeftStartOnRectangleIcon> Logout</button>
        </div>
        </div>
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  </div>
    </div>
</div>
<div style="overflow: auto;">
  <nav class="pt-2 px-4" :style="{ paddingBottom: `calc(10rem + env(safe-area-inset-bottom))` }">
    <SideItem/>
  </nav>
</div>

</div>
<!-- end: Sidebar -->
</template>

<style lang="scss" scoped>
.sidebardw{
  overflow: overlay;
  z-index: 10;
}
</style>

<script setup>
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/solid";
</script>