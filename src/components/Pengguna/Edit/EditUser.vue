<script setup>
  import {
    UserGroupIcon,
    ChevronLeftIcon,
    Cog6ToothIcon,
    ArrowUpTrayIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    ArrowLeftIcon
  } from "@heroicons/vue/24/outline";
  import {
    PencilSquareIcon,
  } from '@heroicons/vue/20/solid';
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
  
  const checkDigit = (event) => {
    if (event.key && event.key.length === 1 && isNaN(Number(event.key))) {
        event.preventDefault();
    } else {
        return true;
    }
  }
</script>
<template>
  
  <router-link :to="{ path: `${this.$route.meta.to}`}">
    <v-btn variant="outlined" color="primary" v-if="userData">
      <ChevronLeftIcon class="h-6 w-6 text-blue-600 mr-1" />Back
    </v-btn>
  </router-link>
  <div v-if="isLoading" class="loader mx-[50%] my-40"></div>
  <div v-else>
    <div class="mx-auto mt-4 bg-white h-full w-full rounded-lg shadow" v-if="userData">
      <div class="flex bg-slate-100 gap-2 text-center items-center py-4 px-4">
        <PencilSquareIcon class="h-6 w-6 text-blue-500" />
        <h1 class="font-bold text-xl text-blue-500">Edit User Management</h1>
      </div>
      <hr class="w-full">
        <div class="flex w-full">          
              <div class="w-1/4 p-4 flex-nowrap "> <!-- here -->
                  <div class="text-center h-64 w-64">
                    <div class="relative group w-64 h-64 mx-auto">
    <!-- Profile Image -->
    <img
      class="h-full w-full  border border-dashed border-gray-700 shadow"
      :src="userFile ? userFile : defaultPicture"
      id="uploaded-image"
      alt="Profile Picture"
    />
    <!-- Icon to change the image, shown on hover -->
    <div
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-70 transition-opacity duration-300 cursor-pointer"
    >
      <!-- Magnify Icon -->
      <div
        class="flex items-center justify-center mx-2"
        @click="magnifyImage"
      >
        <MagnifyingGlassIcon class="h-8 w-8 text-white" />
      </div>
      <span class="text-2xl">|</span>
      <!-- Pencil Icon -->
      <div
        class="flex items-center justify-center mx-2"
        @click="triggerFileInput"
      >
        <PencilSquareIcon class="h-8 w-8 text-white" />
      </div>
    </div>
  </div>
                    <TransitionRoot as="template" :show="isModalOpenPreview">
                      <Dialog as="div" class="fixed z-50 inset-0 overflow-y-hidden" @close="closeModal">
                        <div
                          class="flex items-center justify-center h-full pt-4 px-4 text-center sm:block sm:p-0">
                          <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>
                          <div class="inline-block align-bottom text-left transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div class="sm:flex sm:items-start justify-center">
                                <div class="text-center w-full">
                                  <!-- Cropper here -->
                                  <img
                                    class="h-full w-full mx-auto"
                                    :src="userFile ? userFile : defaultPicture"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </TransitionRoot>
                    <div class="mt-2">
                      <Field ref="fileInput" id="file-upload" type="file" class="hidden" accept="image/*" name="file"
                        @change="handleFileUpload"/>
                      <button
                        class="w-full bg-gradient-to-r from-green-500 to-green-500 font-semibold mt-2 rounded text-white select-none"
                        v-if="confirmFile" :disabled="isUploading" :class="{ 'cursor-not-allowed': isUploading }"
                        @click="uploadFile">
                        <span v-if="isUploading">Loading...</span>
                        <span v-else>Save</span>
                      </button>
                    </div>
                    <TransitionRoot as="template" :show="isModalOpen">
                      <Dialog as="div" class="fixed z-50 inset-0 overflow-y-hidden" @close="closeModal">
                        <div
                          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>
                          <div
                            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                            <div class=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div class="sm:flex sm:items-start justify-center">
                                <div class="text-center w-full">
                                  <DialogTitle class="flex items-center justify-between mb-4">
                                    <div class="text-lg font-bold leading-7">{{ title }}</div>
                                  </DialogTitle>
                                  <!-- Dinamic Dialog -->
                                    <cropper ref="cropper" id="cropper" class="h-64 w-64 mx-auto" v-if="editFoto"
                                    :src="userFiles"
                                    @change="change" 
                                    :aspectRatio="aspectRatio" 
                                    :resizeImage="false"
                                    :restrictPosition="true" 
                                    :stencil-props="{
                                      aspectRatio: 1,
                                      movable: true,
                                      resizable: false  
                                    }" />
                                    <div class="px-4 py-3 sm:px-6 sm:flex float-right gap-3" v-if="editFoto">
                                        <v-btn
                                            class="hover:shadow-form rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none"
                                             type="button" @click="confirmUpload">Submit</v-btn>
                                             <v-btn
                                            class="hover:shadow-form rounded-full border border-gray-300 px-4 py-2 text-center font-semibold text-sm text-gray-500 outline-none"
                                             type="button" @click="closeModal">Cancel</v-btn>
                                    </div>
                                    <Form @submit="submitForm" keep-values v-if="editRole || editJK || editContact">
                                      <div class="-mx-3 flex flex-wrap">
                                        <div class="w-full px-3">

                                          <div class="mb-2" v-if="editRole">
                                                            <div ref="dropdownWrapper"  
                                                                @focusout="handleFocusOut"
                                                                tabindex="0">
                                                                <button 
                                                                type="button"
                                                                @click="toggleRole" 
                                                                :class="openrole ? 'ring-blue-600' : ''" 
                                                                class="rounded-md flex w-full items-center justify-between bg-white p-2 border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                                >
                                                                <span>{{ role === '' ?  userData.role : role }}</span>
                                                                <ChevronDownIcon class="h-4 w-4 text-gray-600 hover:text-gray-500"></ChevronDownIcon>
                                                                </button>
                                                                <ul v-if="openrole" class="z-50 absolute mt-1 w-[94%] rounded bg-white ring-1 ring-gray-300 text-left">
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setRole('Admin')"
                                                                >
                                                                    Admin
                                                                </li>
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setRole('User')"
                                                                >
                                                                    User
                                                                </li>
                                                                </ul>
                                                                </div>
                                                            <Field v-model="computedRole" type="hidden" name="role" id="role" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="role" />
                                          </div>
                                          
                                          <div class="mb-2" v-if="editJK">
                                                            <div ref="dropdownWrapper"  
                                                                @focusout="handleFocusOut"
                                                                tabindex="0">
                                                                <button 
                                                                type="button"
                                                                @click="toggleJk" 
                                                                :class="openJK ? 'ring-blue-600' : ''" 
                                                                class="rounded-md flex w-full items-center justify-between bg-white p-2 border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                                >
                                                                <span>{{ jkel === '' ?  userData.jk : jkel }}</span>
                                                                <ChevronDownIcon class="h-4 w-4 text-gray-600 hover:text-gray-500"></ChevronDownIcon>
                                                                </button>
                                                                <ul v-if="openJK" class="z-50 absolute mt-1 w-[94%] rounded bg-white ring-1 ring-gray-300 text-left">
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setJk('Pria')"
                                                                >
                                                                    Pria
                                                                </li>
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setJk('Wanita')"
                                                                >
                                                                    Wanita
                                                                </li>
                                                                </ul>
                                                                </div>
                                                            <Field v-model="computedJk" type="hidden" name="jk" id="jk" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="jk" />
                                          </div>

                                          <div class="mb-2" v-if="editContact">
                                                            <Field :rules="validateEmail" type="text" name="email"
                                                                id="email" placeholder="Masukan Email....." v-model="email"
                                                                class="w-full rounded-md block border mb-3 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="email" />
                                                            <Field type="text" name="nohp" id="nohp"
                                                                :rules="validateNoHP" placeholder="62xxxx....." v-model="nohp"
                                                                @keydown="checkDigit"
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="nohp" />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="flex float-right gap-2 mt-5 mb-5">
                                        <v-btn
                                            class="hover:shadow-form rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none"
                                            type="submit">Submit
                                        </v-btn>
                                        <v-btn
                                            class="hover:shadow-form rounded-full border border-gray-300 px-4 py-2 text-center font-semibold text-sm text-gray-500 outline-none"
                                             type="button" @click="closeModal">Cancel
                                        </v-btn>
                                    </div>
                                    </Form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </TransitionRoot>
                  </div>
                </div>
                <div class="w-3/6 p-4 ">
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">UserID</p>
                    <div class="text-right">
                      <h1 class="text-gray-600">{{ userData.user_id }}</h1>
                    </div>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Username</p>
                      <h1 class="text-gray-600">{{ userData.username }}</h1>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold flex items-center text-center">Role<a class="ml-3 text-blue-500 text-sm cursor-pointer" @click="editRoleForm">Edit</a></p>
                              <div class="text-right">
                                  <tippy
                                  content="Current Role"
                                  placement="bottom"
                                  arrow>
                                <button :class="ButtonClassRole(userData.role)">
                                {{ userData.role }}
                                </button>
                                </tippy>
                            </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Contact Information<a class="ml-3 text-blue-500 text-sm cursor-pointer" @click="editContactForm">Edit</a></p>
                    <div class="text-right">
                      <p class="text-gray-600 font-medium">{{ userData.email }}</p>
                      <p class="text-gray-600 font-medium">{{ userData.nohp }}</p>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Gender<a class="ml-3 text-blue-500 text-sm cursor-pointer" @click="editJkForm">Edit</a></p>
                    <div class="text-right">
                      <p class="text-gray-600 font-medium flex gap-2 items-center justify-end" v-if="userData.jk">
                        <span :class="userData.jk === 'Pria' ? 'mdi-gender-male text-blue-500' : 'mdi-gender-female text-pink-500'"
                          class="mdi text-xl"></span>
                          {{ jk(userData.jk) }}
                      </p>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Created Date</p>
                    <div class="text-right" v-if="userData.createdAt">
                      <p class="text-gray-600  flex items-center justify-end gap-2">
                        <CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center">
                        </CalendarDaysIcon><span class="font-bold">{{ formatDate(userData.createdAt) }}</span>
                      </p>
                      <p class="text-gray-600  flex items-center justify-end gap-2">
                        <ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>
                        {{ formatTime(userData.createdAt) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Updated Date</p>
                    <div class="text-right" v-if="userData.updatedAt">
                      <p class="text-gray-600  flex items-center justify-end gap-2">
                        <CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center">
                        </CalendarDaysIcon><span class="font-bold">{{ formatDate(userData.updatedAt) }}</span>
                      </p>
                      <p class="text-gray-600  flex items-center justify-end gap-2">
                        <ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>
                        {{ formatTime(userData.updatedAt) }}
                      </p>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="py-2">
                    <p class="text-gray-600 font-semibold">Password</p>
                    <div class="mt-4">
                      <button
                        class="w-full bg-gradient-to-r from-blue-500 to-blue-400 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2"
                        @click="ResetPasswordPengguna(userData.user_id)">
                        <KeyIcon class="h-4 w-4 text-white"></KeyIcon>Reset Password
                      </button>
                    </div>
                  </div>
        <div class="py-2">
                    <p class="text-gray-600 font-semibold">Status</p>
                    <div class="mt-4">
                      <button
                      :class="[
                        userData.status === 'Active'
                          ? 'bg-gradient-to-r from-red-500 to-red-400'
                          : 'bg-gradient-to-r from-green-500 to-green-400',
                        'w-full font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2'
                      ]"
                      @click="toggleStatus"
                    >
                      <component :is="iconComponent" class="h-4 w-4 text-white" />
                      {{ buttonText }}
                    </button>
                    </div>
                  </div>
                </div>
                <div class="w-1/4 p-4 ">
                  <div class="flex justify-end py-2 gap-2">
                    <tippy
                      content="Current Status"
                      placement="bottom"
                      arrow
                    >
                    <button :class="ButtonClassStatus(userData.status)">
                      {{ userData.status }}
                    </button>
                  </tippy>
                    <Menu as="div" class="relative inline-block text-left">
  <MenuButton
    class="flex h-8 w-8 rounded-full justify-center items-center text-sm font-semibold text-gray-600 "
  >
    <Cog6ToothIcon class="h-6 w-6 text-gray-600" />
  </MenuButton>
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
          active ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white' : 'text-gray-600',
          'group flex w-full items-center rounded-md px-2 py-2 text-sm'
        ]"
        @click="toggleStatus"
      >
        <PencilSquareIcon class="w-5 h-5 mr-2" />
        Change Status
      </button>
            </MenuItem>
            <div class="border-b border-gray-200"></div>
            <MenuItem v-slot="{ active }">
              <button @click="logout"
                :class="[
                  active ? 'bg-gradient-to-r from-red-500 to-red-400 text-white' : 'text-gray-600',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <TrashIcon class="w-5 h-5 mr-2" />Delete User
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
</Menu>
                  </div>
                </div>
            </div>
    </div>
    <!-- Tampilkan pesan jika userData belum ada -->
    <NotFound v-else />
  </div>
</template>
<style src="@assets/css/css_404.css"></style>
<style src="@assets/css/loading.css"></style>
<script>
  import { useToast } from "vue-toastification";
  import {
    defineComponent,
    ref
  } from 'vue';
  import {
    Cropper
  } from 'vue-advanced-cropper';
  import 'vue-advanced-cropper/dist/style.css';

  import {
    Form,
    Field,
    ErrorMessage
  } from 'vee-validate';
  import {
    CalendarDaysIcon,
    EyeIcon,
    KeyIcon,
    TrashIcon,
    NoSymbolIcon,
    ShieldCheckIcon,
  } from '@heroicons/vue/20/solid';
  import {
    ClipboardDocumentIcon,
    ClockIcon
  } from '@heroicons/vue/24/outline';
  import {
    getUsersById,
    resetPaswword,
    changeStatus,
    changeFoto,
    changeRole,
    changeContact
  } from '@/services/pengguna/Pengguna.js';
  import NotFound from '../../NotFoundPage/NotFound.vue';
  import Swal from 'sweetalert2';
  import defaultPicture from '@/assets/img/Person.jpg'; // Import the image

  export default {
    components: {
      NotFound,
      Cropper,
    },


    data() {
      return {
        toast: useToast(), 
        editFoto: false,
        editRole: false,
        editContact: false,
        editJK: false,
        defaultPicture,
        userData: null, // Inisialisasi data pengguna
        isLoading: true,
        isNotFound: false,
        userFiles: '',
        userFile64: '',
        title: '',
        file: null,
        isModalOpen: false,
        isModalOpenPreview : false,
        confirmFile: false,
        show: false,
        isUploading: false,
        openrole: false,
        openJK: false,
        opencontact: false,
        email: '',
        nohp: '',
        role: '',
        jkel: ''
      };
    },
    setup() {
      const toast = useToast();
      return { toast }
    },
    created() {
      // Ketika komponen dibuat, panggil metode untuk mengambil data pengguna
      this.fetchUserData(this.$route.params.user_id);
    },
    computed: {
      computedEmail: {
      get() {
        console.log("Current this.email:", this.email);
        console.log("Current this.userData.email:", this.userData.email);
        // Mengembalikan email berdasarkan kondisi
        return this.email === '' ? this.userData.email : this.email;
      },
      set(value) {
        // Mengubah nilai input ke email
        this.email = value;
      },
    },
    computedNoHP: {
      get() {
        // Mengembalikan email berdasarkan kondisi
        return this.nohp === '' ? this.userData.nohp : this.nohp;
      },
      set(value) {
        // Mengubah nilai input ke email
        this.nohp = value;
      },
    },
    computedRole: {
      get() {
        // Mengembalikan email berdasarkan kondisi
        return this.role === '' ? this.userData.role : this.role;
      },
      set(value) {
        // Mengubah nilai input ke email
        this.role = value;
      },
    },
    computedJk: {
      get() {
        // Mengembalikan email berdasarkan kondisi
        return this.jkel === '' ? this.userData.jk : this.jkel;
      },
      set(value) {
        // Mengubah nilai input ke email
        this.jkel = value;
      },
    },
    buttonText() {
      return this.userData.status === 'Active' ? 'Non Active' : 'Active';
    },
    iconComponent() {
      return this.userData.status === 'Active' ? NoSymbolIcon : ShieldCheckIcon;
    }
  },
    methods: {
      async submitForm(){
        if (this.editRole) {
          try {
            const response = await changeRole(this.userData.user_id, { role: this.role });
            console.log('Role updated:', response);
            this.toast.success(response.message);
            this.userData.role = this.role;
            this.$store.dispatch('updateUserRole', this.userData.role);
            this.closeModal();
        } catch (error) {
            console.error("Error updating role:", error);
            this.toast.error("Failed to update role. Please try again."); // Tampilkan pesan kesalahan
            this.closeModal();
        }
        } else if (this.editJK) {
            console.log("Updating JK:", this.jkel);
        } else if (this.editContact) {
          this.computedEmail = this.email
          this.computedNoHP = this.nohp
          console.log("Updating Contact:", this.email);
          console.log("Updating Contact:", this.nohp);
          try{
            const response = await changeContact(this.userData.user_id, {email: this.computedEmail, nohp: this.computedNoHP});
            console.log('Contact updated:', response);
            this.toast.success(response.message);
            this.closeModal();
          }catch(error){
            console.error("Error updating contact:", error);
            this.toast.error("Failed to update contact. Please try again."); // Tampilkan pesan kesalahan
            this.closeModal();
          }
        }   
      },
      setRole(role){
        this.role = role
        this.openrole = false
    },
    setJk(item){
        this.jkel = item
        this.openJK = false
    },
      editRoleForm() {
        this.editRole = true
        this.title = "Edit Role";
        this.isModalOpen = true;
      },
      editContactForm() {
        this.editContact = true
        this.title = "Edit Contact Information";
        this.isModalOpen = true;
      },
      editJkForm() {
        this.editJK = true
        this.title = "Edit Gender";
        this.isModalOpen = true;
      },
    toggleStatus() {
      const newStatus = this.userData.status === 'Active' ? 'Inactive' : 'Active';
      this.rubahStatus(this.userData.user_id, newStatus);
    },
      handleFocusOut(event) {
      if (!this.$refs.dropdownWrapper.contains(event.relatedTarget)) {
        this.openrole = false;  // Close dropdown if focus leaves the dropdown
        this.openJK = false;
        this.opencontact = false;
      }
    },
      toggleRole() {
      this.openrole = !this.openrole;
      },
      toggleJk() {
      this.openJK = !this.openJK;
      },
      toggleContact() {
      this.opencontact = !this.opencontact;
      },
      async uploadFile() {
        this.isUploading = true;
        try {
          if (!this.file) {
            throw new Error('Tidak ada file untuk diupload');
          }
          const file = this.DataURIToBlob(this.userFile64);
          const formData = new FormData();
          formData.append('file', file); // Tambahkan file ke FormData
          const response = await changeFoto(this.$route.params.user_id, formData);
          this.$store.dispatch('updateUserFile', this.userFile64);
          await Swal.fire({
            icon: "success",
            title: "Foto berhasil diupdate",
            showConfirmButton: false,
            timer: 1500
          });
          this.confirmFile = false
          this.file = null; // Reset file
          return response;
        } catch (error) {
          console.error('Error saat mengupdate data:', error);
          await Swal.fire({
            icon: "error",
            title: "Data gagal disimpan",
            showConfirmButton: false,
            timer: 1500
          });
          throw error; // Melempar kembali error untuk ditangani di luar fungsi ini jika perlu
        } finally {
          this.isUploading = false;
        }
      },
      change({
        coordinates,
        canvas
      }) {
        const hoi = canvas.toDataURL();
        this.show = true
        this.userFile64 = hoi
        console.log(this.userFile64)
      },
      openModalFoto() {
        if (this.file) {
          this.userFiles = URL.createObjectURL(this.file); // Menampilkan gambar yang dipilih saat modal dibuka
          this.isModalOpen = true;
          document.addEventListener('keydown', this.handleEsc);
        } else {
          this.file = null;
          this.isModalOpen = false;
          // Handle case where no file is selected
          this.toast.info("Please select a file first");
        }
      },
      closeModal() {
        this.editFoto = false
        this.editContact = false
        this.editJK = false
        this.editRole = false
        this.isModalOpen = false;
        this.isModalOpenPreview = false;
        this.file = null;
        this.userFiles = '';
        document.removeEventListener('keydown', this.handleEsc);
      },
      handleEsc(event) {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      },
      confirmUpload() {
        if (this.userFile64 && this.file) {
          this.userFile = this.userFile64
          this.confirmFile = true; // Menandai file sudah dikonfirmasi
          this.isModalOpen = false; // Menutup modal
        } else {
          alert("File is Unknown");
        }
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.file = file; // Simpan file untuk digunakan saat upload
        this.confirmFile = false; // Reset konfirmasi
        this.openModalFoto(); // Tampilkan modal untuk crop gambar
        console.log(this.file);
      },
      DataURIToBlob(dataURL) {
        const splitDataURI = dataURL.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], {
          type: mimeString
        })
      },
      magnifyImage(){
        this.isModalOpenPreview = true;
      },
      triggerFileInput() {
        this.editFoto = true
        this.editRole = false
        // Panggil metode click pada elemen input file
        this.$refs.fileInput.$el.click();
        this.title = "Crop Image";
      },
      jk(item){
        if(item === 'Pria'){
          return 'Male'
        }else{
          return 'Female'
        }
      },
      ButtonClassStatus(status) {
        // Tentukan kelas CSS berdasarkan nilai peran
        if (status === 'Inactive') {
          return 'bg-gradient-to-r from-red-500 to-red-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
        } else if (status === 'Active') {
          return 'bg-gradient-to-r from-green-500 to-green-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
        }
      },
      ButtonClassRole(role) {
      // Tentukan kelas CSS berdasarkan nilai peran
      if (role === 'Admin') {
        return 'bg-gradient-to-r from-green-500 to-green-400 px-2 py-1 rounded text-white select-none cursor-default text-sm font-semibold';
      } else {
        return 'bg-gradient-to-r from-blue-500 to-blue-400 px-2 py-1 rounded text-white select-none text-sm font-semibold';
      }
    },
      formatDate(dateString) {
        // Konversi string tanggal ke objek Date
        const date = new Date(dateString);
        // Daftar nama bulan
        const monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oct",
          "Nov", "Dec"
        ];

        // Ambil nama bulan sesuai indeks
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];
        const dateText = date.getDate();
        const formatDate = dateText < 10 ? '0' + date.getDate() : date.getDate();
        // Format tanggal
        const formattedDate = monthName + ', ' + formatDate + ' ' + date.getFullYear();

        // Gabungkan tanggal dan jam
        return formattedDate;
      },
      formatTime(dateString) {
        // Konversi string tanggal ke objek Date
        const date = new Date(dateString);
        // Daftar nama bulan
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        };
        // Format jam
        return date.toLocaleTimeString('en-US', options);
      },
      async updateRole(item) {
        const response = await changeRole(item);
          Swal.fire({
            icon: "info",
            title: `Info  ${item} & ${this.userData.user_id}`,
            showConfirmButton: false,
            timer: 1500
          })
        // const response = await changeRole(item);
        // if (!response) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Gagal merubah role",
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
        //   return;
        // } else {
        //   Swal.fire({
        //     title: 'Success',
        //     text: `Role pengguna ${this.userData.username} berhasil diubah`,
        //     icon: 'success',
        //     timer: 1500
        //   });
        // }
      },
      async ResetPasswordPengguna(item) {
        Swal.fire({
          title: "Anda yakin?",
          text: `Anda akan mereset password pengguna ini!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#1A55AE",
          cancelButtonColor: "#D1CFCE",
          confirmButtonText: "Ya, Reset Password!",
          cancelButtonText: "Batal"
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await resetPaswword(item);
            if (!response) {
              Swal.fire({
                icon: "error",
                title: "Password gagal direset",
                showConfirmButton: false,
                timer: 1500
              })
              return;
            } else {
              Swal.fire({
                title: 'Success',
                text: `Password berhasil direset, silahkan login kembali dengan password (12345678)`,
                icon: 'success'
              });
            }
          }
        });
      },
      async rubahStatus(item) {
        Swal.fire({
          title: "Anda yakin?",
          text: `Anda akan mengubah status pengguna ini!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#1A55AE",
          cancelButtonColor: "#D1CFCE",
          confirmButtonText: "Ya, Ubah Status!",
          cancelButtonText: "Batal"
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await changeStatus(item);
            if (!response) {
              Swal.fire({
                icon: "error",
                title: "Status gagal diubah",
                showConfirmButton: false,
                timer: 1500
              })
              return;
            } else {
              Swal.fire({
                title: 'Success',
                text: 'Status pengguna berhasil diubah',
                icon: 'success'
              });
              this.fetchUserData(this.$route.params.user_id);
            }
          }
        });
      },
      async fetchUserData(item) {
        setTimeout(async () => {
          const user = await getUsersById(item);
          this.userData = user;
          this.isLoading = false;
          if (user && user.file && user.file.data && user.file.data.length > 0) {
            // Convert buffer to blob
            const blob = new Blob([new Uint8Array(user.file.data)], {
              type: user.fileMimeType
            });
            // Create URL from blob
            this.userFile = URL.createObjectURL(blob);
          } else {
            // Handle if there's no image data
            this.userFile = ''; // Set default image or show placeholder
            this.isNotFound = true;
          }
          if (!user) {
            this.isNotFound = true;
          }
        }, 500); // Contoh waktu penundaan 2 detik
      },
    },
  };
</script>