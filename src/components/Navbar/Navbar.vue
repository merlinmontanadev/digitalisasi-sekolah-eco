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
                    :class="[
                    'h-6 w-6 shrink-0',
                    ]"
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
                      class="w-12 h-7 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
                    >
                      <div
                        id="switch-toggle"
                        :class="toggleClass"
                        class="w-7 h-7 relative rounded-full transition duration-500 transform p-1 text-white"
                      >
                        <span v-html="currentIcon"></span>
                      </div>
                    </button>
                </li>
                <li class="ml-3">
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
                            <button type="button" data-tab="notification" data-tab-page="notifications" class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications</button>
                            <button type="button" data-tab="notification" data-tab-page="messages" class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages</button>
                        </div>
                        <div class="my-2">
                            <ul class="max-h-64 overflow-y-auto" data-tab-for="notification" data-page="notifications">
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
                            <ul class="max-h-64 overflow-y-auto hidden" data-tab-for="notification" data-page="messages">
                                <li>
                                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                        <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                                        <div class="ml-2">
                                            <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                        <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                                        <div class="ml-2">
                                            <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                        <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                                        <div class="ml-2">
                                            <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                        <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                                        <div class="ml-2">
                                            <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                        <img src="#" alt="" class="w-8 h-8 rounded block object-cover align-middle">
                                        <div class="ml-2">
                                            <div class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
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
      return this.isDarkmode ? 'bg-gray-700 translate-x-full' : 'bg-yellow-500 -translate-x-2';
    },
    currentIcon() {
      return this.isDarkmode ? this.darkIcon : this.lightIcon;
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
      defaultPicture,
      toast: useToast(),  
      showDropDown: false,
      showDropDownNotif: false,
      isDarkmode: false,
      darkIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>`,
      lightIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>`,
    }
  },
  setup() {
  const toast = useToast();
  return { toast }
},
mouted(){
  const savedMode = localStorage.getItem('isDarkmode') === 'true';
    this.isDarkmode = savedMode;
    this.switchTheme(); // Call switchTheme on mounted to set initial state
},
  methods: {
    toggleTheme() {
      this.isDarkmode = !this.isDarkmode;
      localStorage.setItem('isDarkmode', this.isDarkmode);
      this.switchTheme();
    },
    switchTheme() {
      // Optional: If you want to add body class changes
      // document.body.classList.toggle('dark-mode', this.isDarkmode);
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