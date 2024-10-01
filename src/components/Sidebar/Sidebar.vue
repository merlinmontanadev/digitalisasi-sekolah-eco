<script>
import SideItem from './SideItem.vue';
import { computed, onMounted } from 'vue';
import { HomeIcon, UserGroupIcon, ClockIcon, CircleStackIcon, Cog6ToothIcon, TagIcon, BuildingOfficeIcon, ArrowLeftStartOnRectangleIcon} from "@heroicons/vue/24/outline"
import { logoutUser } from '@/services/auth/auth.js';
import { useToast } from "vue-toastification";
import Cookies from 'js-cookie';
import defaultPicture from '@/assets/img/Person.jpg'; // Import the image

export default {
  props: {
    isSidebarVisible: Boolean,
    user: {
      type: Object,
      required: true
    },
    userFile: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    computedUserFile() {
      if (this.$store.getters.getUserFile) {
      return this.$store.getters.getUserFile;
    }
    if (this.userFile) {
      return this.userFile;
    }
    return defaultPicture;
    },

    computedUserRole(){
      if (this.$store.getters.getUserRole) {
      return this.$store.getters.getUserRole;
    }
    if (this.user.role) {
      return this.user.role;
    }
    return;
    },
    changeLocale(newLocale) {
      this.$i18n.locale = newLocale; // Mengubah locale
    },
    navItems(){
      return [
        {
          href: "/admin/dashboard",
          label: this.$t('dashboard'),
          children: [],
          icon: HomeIcon
        }, {
          href: "/admin/user-management",
          single: true,
          label: this.$t('user'),
          group: this.$t('Group1'),
          children: [],
          icon: UserGroupIcon,
        }, {
          href: "#",
          label: this.$t('student'),
          single: false,
          group: "",
          icon: CircleStackIcon,
          children: [{
              href: "/admin/student-management",
              label: this.$t('subStudent1'),
              single: false,
              group: "",
              children: [],
              icon: null
            },
          ],
        }, {
          href: "#",
          label: this.$t('teacherEducator'),
          children: [{
              href: "/admin/manajemen-gtk",
              label: this.$t('subTeacherEducator'),
              children: [],
              icon: null
            },
          ],
          icon: CircleStackIcon
        }, {
          href: "#",
          label: this.$t('alumni'),
          children: [{
              href: "/admin/manajemen-alumni",
              label: this.$t('subAlumni'),
              children: [],
              icon: null
            },
          ],
          icon: CircleStackIcon
        },
        {
          href: "#",
          single: true,
          label: this.$t('absence'),
          group: this.$t('Group2'),
          children: [{
              href: "/admin/absensi/gtk",
              label: this.$t('subAbsence1'),
              children: [],
              icon: null
            },
            {
              href: "/admin/absensi/murid",
              label: this.$t('subAbsence2'),
              children: [],
              icon: null
            },
          ],
          icon: ClockIcon
        }, {
          href: "/admin/pelanggaran",
          single: true,
          label: this.$t('violation'),
          group: this.$t('Group5'),
          children: [],
          icon: TagIcon
        }, {
          href: "/admin/poin/pelanggaran",
          label: this.$t('pointViolation'),
          children: [],
          icon: TagIcon
        }, {
          href: "/admin/kategori-pelanggaran",
          label: this.$t('categoryViolation'),
          children: [],
          icon: TagIcon
        }, 
        {
          href: "#",
          single: true,
          label: this.$t('bkk'),
          group: this.$t('Group3'),
          children: [{
              href: "/admin/bkk/list",
              label: this.$t('subBkk1'),
              children: [],
              icon: null
            },
            {
              href: "/admin/bkk/perusahaan",
              label: this.$t('subBkk2'),
              children: [],
              icon: null
            },
          ],
          icon: BuildingOfficeIcon,
        },{
          href: "/admin/setting/sekolah",
          single: true,
          label: this.$t('settingSchool'),
          group: this.$t('Group4'),
          children: [],
          icon: Cog6ToothIcon
        },
      ]
      
    }
  },
  data() {
    return {
      isModalOpenPreview : false,
      defaultPicture,
      toast: useToast(),  
    };
  },
  methods: {
    getButtonClassRole(role) {
      // Tentukan kelas CSS berdasarkan nilai peran
      if (role === 'Admin') {
        return 'bg-gradient-to-r from-green-500 to-green-400 px-2 py-1 rounded text-white select-none text-sm font-semibold cursor-default text-sm';
      } else if (role === 'User') {
        return 'bg-gradient-to-r from-blue-500 to-blue-400 px-2 py-1 rounded text-white select-none text-sm font-semibold cursor-default text-sm';
      }
    },
    closeModal() {
        this.isModalOpenPreview = false;
        document.removeEventListener('keydown', this.handleEsc);
      },
      handleEsc(event) {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      },
    magnifyImage(){
        this.isModalOpenPreview = true;
      },
    userFile() {
      return this.userFile ? this.userFile : this.$store.getters.getUserFile;
    },
    userRole(){
      return this.user.role ? this.user.role : this.$store.getters.getUserRole;
    },
    upper(string) {
      return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    },
    async logout() {
      try {
        const response = await logoutUser();
        Cookies.remove('refreshToken');
        this.toast.info(response.message);
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
  <!--Start: Profil-->
  <div class="flex border-b py-4 px-4">
    <div class="container mx-auto">
      <div class="flex flex-col">
    <Suspense>
    <template #default>
      <div class="flex gap-3 text-warp items-center">
        <div v-if="loading" class="h-20 w-20 shadow bg-gray-200">
        <div class="animate-pulse">
          <div className="w-20 h-20  bg-gray-300 mb-2">&nbsp;</div>
        </div>
        </div>
        <div clas="flex" v-else>
        <div class="relative group h-20 w-20 rounded-full shadow ">
          <img ref="zoomImage" :src="computedUserFile" className="w-20 h-20  border-dashed border border-gray-700 shadow"/>
          <tippy
          
          :content="$t('tippyPhoto')" 
                      placement="bottom"
                      arrow
                    >
          <div
      class="absolute shadow inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-70 transition-opacity duration-300 cursor-pointer"
      @click="magnifyImage">
      <!-- Magnify Icon -->
      <div
        class="flex items-center justify-center mx-2"
      >
        <MagnifyingGlassIcon class="h-6 w-6 text-white" />
      </div>
    </div>
  </tippy>
        </div>
        <TransitionRoot as="template" :show="isModalOpenPreview">
                      <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto" @close="closeModal">
                        <div
                          class="flex items-center justify-center h-full pt-4 px-4 text-center sm:block sm:p-0">
                          <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>
                          <div
                            class="inline-block align-bottom text-left transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div class="sm:flex sm:items-start justify-center">
                                <div class="text-center w-full">
                                  <!-- Cropper here -->
                                  <img
                                    class="h-full w-full mx-auto"
                                    :src="computedUserFile"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </TransitionRoot>
        </div>
        <div class="justify-center text-left items-center w-full">
  <div v-if="loading" class="font-bold h-[20px] w-full rounded-md bg-gray-200 mb-1.5">
    <div class="animate-pulse">
      <div class="bg-gray-300 rounded w-full h-[20px]">&nbsp;</div>
    </div>
  </div>
  <div v-else>
    <div class="font-bold text-gray-500">
      {{ upper(user?.username) }}
    </div>
  </div>
  <div class="items-center text-left justify-center">
    <div v-if="loading" class="w-full rounded-md bg-gray-200 h-[20px]">
      <div class="animate-pulse">
        <div class="bg-gray-300 rounded w-full h-[20px]">&nbsp;</div>
      </div>
    </div>
    <div v-else>
      <tippy
      :content="$t('tippyRole')"                
                      placement="bottom"
                      arrow
                    >
      <button :class="getButtonClassRole(upper(computedUserRole))" class="font-bold text-gray-500">
        {{ upper(computedUserRole) }}
        </button>
      </tippy>
    </div>
  </div>
</div>
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  </div>
  <div class="flex mt-3 text-center items-center">
          <router-link :to="`/admin/user-management/edit/user/${user?.user_id}`" >
            <button class="w-full font-semibold text-sm mt-2 flex bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-l-md">
            <UserIcon class="mr-2 h-5 w-5 text-white"></UserIcon> {{ $t("profile") }}
          </button>
          </router-link>
          <button @click="logout" class="w-full font-semibold text-sm mt-2 flex bg-gradient-to-r from-red-500 to-red-400 text-white px-4 py-2 rounded-r-md"><ArrowLeftStartOnRectangleIcon class="mr-2 h-5 w-5 text-white"></ArrowLeftStartOnRectangleIcon>{{ $t("logout") }}</button>
  </div>
    </div>
</div>
<div style="overflow: auto;">
  <nav class="pt-2 px-4" :style="{ paddingBottom: `calc(10rem + env(safe-area-inset-bottom))` }">
    <SideItem
      :item="item"
      v-for="item in navItems"
      :key="item.label"
    />
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
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionRoot
  } from '@headlessui/vue'
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/solid";
</script>