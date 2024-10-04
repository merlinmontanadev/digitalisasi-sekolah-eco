<script setup>
import { Bars3Icon, BellIcon, QuestionMarkCircleIcon, ArrowRightStartOnRectangleIcon, Cog6ToothIcon, ArrowsPointingOutIcon } from "@heroicons/vue/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
<template>
            <!-- start: Navbar -->
            <div class="w-full h-16 gap-4 sm:h-16 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center text-center justify-center shadow-md shadow-black/10 fixed top-0 z-10 ">
                  <!-- Logo section -->
                  <ul class="flex items-center text-center text-sm">
                    <li>
                <router-link to="/admin/dashboard" class="flex items-center py-4" style="position: sticky; top: 0;">
                  <img src="@/assets/img/Logo Login.png" alt="" class="w-8 h-8 rounded">
                    <span class="md:text-lg text-xs font-bold text-white ml-3">Digitalisasi Sekolah</span>
                </router-link>
              </li>
               </ul>
                <ul class="flex items-center text-center text-sm">
                  <li>
                <tippy
                      :content="$t('tippyHideSidebar')"
                      placement="bottom"
                      arrow
                    >
                <button type="button" class="items-center text-lg text-white sidebar-toggle" @click="toggleSidebar">
                <Bars3Icon
                    :class="['h-6 w-6 shrink-0',]"
                />
            </button>
            </tippy>
          </li>
          </ul>
            <ul class="flex items-center text-center text-sm">
                <li>
                    <span href="#" class="md:block hidden text-white font-medium">Beta Ver 0.0.1</span>
                </li>
            </ul>
            <ul class="ml-auto flex items-center">
                <!-- <li class="ml-3">
                    <div class="px-3 py-1.5 w-full md:w-full md:h-full h-8 rounded-full hidden items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-400 md:flex">
                            <QuestionMarkCircleIcon class="h-5 w-5 text-white"></QuestionMarkCircleIcon> 
                        <div class="ml-2 text-normal text-white font-bold">Aplikasi masih dalam pengembangan!</div>
                    </div>
                </li> -->
                <li class="ml-3">
                  <button
                      @click="toggleTheme"
                      class="w-12 h-6 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
                    >
                      <div
                        id="switch-toggle"
                        :class="toggleClass"
                        class="w-6 h-8  rounded-full transition duration-500 transform text-white"
                      >
                        <span v-html="currentIcon"></span>
                      </div>
                    </button>
                </li>
                <li class="ml-5">
                  <tippy
                      :content="$t('tippyFullContent')"
                      placement="bottom"
                      arrow
                    >
                  <button type="button" class="md:block hidden dropdown-toggle text-gray-400 w-8 h-8 rounded items-center justify-center hover:bg-whi" @click="toggleFullContent">
                        <ArrowsPointingOutIcon
                            :class="[
                            'h-6 w-6 shrink-0 text-white'
                            ]"
                        />
                    </button>
                  </tippy>
                </li>
                <li class="ml-3">
                  <tippy
                      :content="$t('tippyFullNotiffication')"
                      placement="bottom"
                      arrow
                    >
                    <button type="button" class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-whi" @click="toggleDropNotif">
                        <BellIcon
                            :class="[
                            'h-6 w-6 shrink-0 text-white'
                            ]"
                        />
                    </button>
                  </tippy>
                  <div class="absolute right-[27px] md:right-[60px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-w-xs md:max-w-lg w-full bg-white rounded-md border border-gray-100" v-show="showDropDownNotif">
    <div class="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
      <button 
        type="button" 
        class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1"
        :class="{ 'active border-blue-500 text-blue-600': activeTab === 'notifications' }"
        @click="setActiveTab('notifications')">
        Notifications
      </button>
      <button 
        type="button" 
        class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1"
        :class="{ 'active border-blue-500 text-blue-600': activeTab === 'messages' }"
        @click="setActiveTab('messages')">
        Messages
      </button>
    </div>
    <div class="my-2">
      <!-- Notifications Tab Content -->
      <ul v-show="activeTab === 'notifications'" class="max-h-64 overflow-y-auto">
        <li>
          <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
            <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
            <div class="ml-2">
              <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
              <div class="text-[11px] text-gray-400">from a user</div>
            </div>
          </a>
        </li>
      </ul>

      <!-- Messages Tab Content -->
      <ul v-show="activeTab === 'messages'" class="max-h-64 overflow-y-auto">
        <li>
          <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
            <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
            <div class="ml-2">
              <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
              <div class="text-[11px] text-gray-400">Hello there!</div>
            </div>
          </a>
        </li>
        <!-- Add more message list items here -->
      </ul>
    </div>
  </div>
                </li>
                <li class="ml-3">
                    <Menu as="div" class="relative inline-block text-left">
      <div>
        <template v-if="loading">
          <div class="h-10 w-10 rounded-full shadow-md animate-pulse bg-gray-200">
          <div className="w-10 h-10 object-cover rounded-full border border-gray-300 bg-gray-300 mb-2">&nbsp;</div>
        </div>
        </template>
        <template v-else>
          <tippy
                      :content="$t('tippyFullProfile')"
                      placement="bottom"
                      arrow
                    >

          <MenuButton
          class="inline-flex h-10 w-10 rounded-full justify-center  text-sm font-semibold text-white"
        >
        <img class="h-10 w-10 rounded-full" :src="computedUserFile">
        </MenuButton>
        </tippy>
          </template> 
      </div>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 z-50 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <Cog6ToothIcon class="w-5 h-5 mr-2" />{{ $t("setting") }}
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
              @click="whatsappSupport"
                :class="[
                  active ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <QuestionMarkCircleIcon class="w-5 h-5 mr-2" />{{ $t("support") }}
              </button>
            </MenuItem>
            <div class="border-b border-gray-200"></div>
            <MenuItem v-slot="{ active }">
              <button @click="logout"
                :class="[
                  active ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ArrowRightStartOnRectangleIcon class="w-5 h-5 mr-2" />{{ $t("logout") }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
                </li>
            </ul>
        </div>
        <!-- end: Navbar -->
</template>

<script>
import { logoutUser } from '@/services/auth/auth.js';
import { useToast } from "vue-toastification";
import Cookies from 'js-cookie';
import defaultPicture from '@/assets/img/Person.jpg'; // Import the image

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    userFile: {
      type: String,
      required: true
    },
  },
  computed: {
    toggleClass() {
      return this.isLangmode ? ' translate-x-full' : '-translate-x-2';
    },
    currentIcon() {
      return this.isLangmode ? this.idIcon : this.engIcon;
    },
    computedUserFile() {
      return this.$store.getters.getUserFile || this.userFile || defaultPicture; // Use prop or fallback to Vuex
    },
    changeLocale(newLocale) {
      this.$i18n.locale = newLocale; // Mengubah locale
    },
  },
  data() {
    return {
      activeTab: 'notifications',
      showDropDownNotif: true,
      defaultPicture,
      toast: useToast(),  
      showDropDown: false,
      showDropDownNotif: false,
      isLangmode: this.getLangMode(),
      idIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M31,8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4v9H31V8Z" fill="#ea3323"></path><path d="M5,28H27c2.209,0,4-1.791,4-4v-8H1v8c0,2.209,1.791,4,4,4Z" fill="#fff"></path><path d="M5,28H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4ZM2,8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>`,
      engIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>`,
    }
  },
  setup() {
  const toast = useToast();
  return { toast }
},
mouted(){
    const savedMode = localStorage.getItem('isLangmode');
    this.isLangmode = savedMode === 'true'; // Mengatur isLangmode berdasarkan nilai dari localStorage
    this.switchLang(); // Memanggil switchLang untuk mengatur bahasa awal
},
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab; // update active tab
    },
    getLangMode() {
      const mode = localStorage.getItem('isLangmode');
      return mode === 'true'; // Kembalikan nilai boolean
    },
    toggleTheme() {
      this.isLangmode = !this.isLangmode;
      localStorage.setItem('isLangmode', this.isLangmode);
      this.switchLang(); // Ganti bahasa
    },
    switchLang() {
     // Mengatur locale berdasarkan nilai isLangmode
     this.$i18n.locale = this.isLangmode ? 'id' : 'en'; // Ubah locale pada Vue I18n
    },
    whatsappSupport(){
      window.open('https://wa.me/628113300057', '_blank');
    },
    async logout() {
      try {
       await logoutUser();
       Cookies.remove('refreshToken');
       this.toast.info("Logout Berhasil");
       this.$router.push('/login')  
      } catch (error) {
        if(error.response){
          console.log(error.response.data.message)
        }
      }
    },
    toggleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    toggleDropNotif() {
      this.showDropDownNotif = !this.showDropDownNotif;
    },
    toggleFullContent() {
      this.$emit('toggle-full-content');
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  }
}
</script>

<style lang="scss" scoped>
.navbardw{
overflow: overlay;
}
</style>