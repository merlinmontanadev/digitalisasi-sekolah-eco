<script setup>
        import {UserGroupIcon,ChevronLeftIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline";
        import {
                PencilSquareIcon,
                MagnifyingGlassIcon
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
  <router-link to="/admin/student-management">
    <v-btn variant="outlined" color="primary" v-if="muridData">
      <ChevronLeftIcon class="h-6 w-6 text-blue-600 mr-1" /> Back
    </v-btn>
  </router-link>
  <div v-if="isLoading" class="loader mx-[50%] my-40"></div>
  <div v-else>
    <div class="mt-4 bg-white h-full w-full rounded-lg shadow" v-if="muridData">
      <div class="flex bg-slate-100 gap-2 text-center items-center py-4 px-4">
        <PencilSquareIcon class="h-6 w-6 text-blue-500" />
        <h1 class="font-bold text-xl text-blue-500">Edit Student Management</h1>
      </div>
      <hr class="w-full">
      <div class="flex w-full">
        <div class="w-1/4 p-4 flex-nowrap">
          <div class="text-center h-64 w-64">
            <div class="relative group w-64 h-64 mx-auto">
              <!-- Profile Image -->
              <img class="h-full w-full  border border-dashed border-gray-700 shadow"
                :src="muridFile ? muridFile : defaultPicture" id="uploaded-image" alt="Profile Picture" />
              <!-- Icon to change the image, shown on hover -->
              <div
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-70 transition-opacity duration-300 cursor-pointer">
                <!-- Magnify Icon -->
                <div class="flex items-center justify-center mx-2" @click="magnifyImage">
                  <MagnifyingGlassIcon class="h-8 w-8 text-white" />
                </div>
                <span class="text-2xl">|</span>
                <!-- Pencil Icon -->
                <div class="flex items-center justify-center mx-2" @click="triggerFileInput">
                  <PencilSquareIcon class="h-8 w-8 text-white" />
                </div>
              </div>
              <TransitionRoot as="template" :show="isModalOpenPreview">
                <Dialog as="div" class="fixed z-50 inset-0 overflow-y-hidden" @close="closeModal">
                  <div class="flex items-center justify-center h-full pt-4 px-4 text-center sm:block sm:p-0">
                    <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div
                      class="inline-block align-bottom text-left transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                      <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start justify-center">
                          <div class="text-center w-full">
                            <!-- Cropper here -->
                            <img class="h-full w-full mx-auto" :src="muridFile ? muridFile : defaultPicture" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>
              <div class="mt-2">
                <Field ref="fileInput" id="file-upload" type="file" class="hidden" accept="image/*" name="file"
                  @change="handleFileUpload" />
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
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
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
                              :src="muridFiles" @change="change" :aspectRatio="aspectRatio" :resizeImage="false"
                              :restrictPosition="true" :stencil-props="{
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
                                    <div ref="dropdownWrapper" @focusout="handleFocusOut" tabindex="0">
                                      <button type="button" @click="toggleRole" :class="openrole ? 'ring-blue-600' : ''"
                                        class="rounded-md flex w-full items-center justify-between bg-white p-2 border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span>{{ role === '' ?  userData.role : role }}</span>
                                        <ChevronDownIcon class="h-4 w-4 text-gray-600 hover:text-gray-500">
                                        </ChevronDownIcon>
                                      </button>
                                      <ul v-if="openrole"
                                        class="z-50 absolute mt-1 w-[94%] rounded bg-white ring-1 ring-gray-300 text-left">
                                        <li class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200"
                                          @click="setRole('Admin')">
                                          Admin
                                        </li>
                                        <li class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200"
                                          @click="setRole('User')">
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
                                    <div ref="dropdownWrapper" @focusout="handleFocusOut" tabindex="0">
                                      <button type="button" @click="toggleJk" :class="openJK ? 'ring-blue-600' : ''"
                                        class="rounded-md flex w-full items-center justify-between bg-white p-2 border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span>{{ jkel === '' ?  userData.jk : jkel }}</span>
                                        <ChevronDownIcon class="h-4 w-4 text-gray-600 hover:text-gray-500">
                                        </ChevronDownIcon>
                                      </button>
                                      <ul v-if="openJK"
                                        class="z-50 absolute mt-1 w-[94%] rounded bg-white ring-1 ring-gray-300 text-left">
                                        <li class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200"
                                          @click="setJk('Pria')">
                                          Pria
                                        </li>
                                        <li class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200"
                                          @click="setJk('Wanita')">
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
                                    <Field :rules="validateEmail" type="text" name="email" id="email"
                                      placeholder="Masukan Email....." v-model="computedEmail"
                                      class="w-full rounded-md block border mb-3 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                    <ErrorMessage
                                      class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                      name="email" />
                                    <Field type="text" name="nohp" id="nohp" :rules="validateNoHP"
                                      placeholder="62xxxx....." v-model="computedNoHP" @keydown="checkDigit"
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
        </div>
        <div class="w-3/6 p-4">
  <!-- Identitas Murid -->
  <div class="py-2 flex items-center">
    <h2 class="text-gray-800 font-bold text-lg">Identitas Murid</h2><a class="ml-3 font-semibold text-blue-500 text-sm cursor-pointer" @click="editNipdForm">Edit</a>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">MuridID</p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.id_murid }}</h1>
    </div>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold flex items-center text-center">
      NIPD
    </p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.nipd }}</h1>
    </div>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold flex items-center text-center">
      NIS
    </p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.nis }}</h1>
    </div>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold flex items-center text-center">
      NISN
    </p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.nisn }}</h1>
    </div>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold flex items-center text-center">
      Nama Murid
    </p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.nama_lengkap }}</h1>
    </div>
  </div>
  <v-divider class="my-4" />
  <!-- Informasi Pribadi -->
  <div class="py-2 flex items-center">
    <h2 class="text-gray-800 font-bold text-lg">Informasi Pribadi</h2><a class="ml-3 font-semibold text-blue-500 text-sm cursor-pointer" @click="editNipdForm">Edit</a>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Tempat, Tanggal Lahir</p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.tempat_lahir }}, {{ muridData.tanggal_lahir }}</h1>
    </div>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Agama</p>
    <div class="text-right">
      <h1 class="text-gray-600">{{ muridData.agama }}</h1>
    </div>
  </div>
  <!-- Informasi Alamat -->
  <v-divider class="my-4" />
  <div class="py-2 flex items-center">
    <h2 class="text-gray-800 font-bold text-lg">Address</h2><a class="ml-3 font-semibold text-blue-500 text-sm cursor-pointer" @click="editNipdForm">Edit</a>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Alamat Lengkap</p>
    <div class="text-right">
      <p class="text-gray-600 font-medium">{{ muridData.alamat }}, {{ muridData.kel_des }}, {{ muridData.kec }}, {{ muridData.kab }}</p>
    </div>
  </div>
  <v-divider class="my-4" />
  <!-- Informasi Kontak -->
  <div class="py-2 flex items-center">
    <h2 class="text-gray-800 font-bold text-lg">Informasi Kontak</h2><a class="ml-3 font-semibold text-blue-500 text-sm cursor-pointer" @click="editNipdForm">Edit</a>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Telepon</p>
    <div class="text-right">
      <p class="text-gray-600 font-medium">{{ muridData.telepon }}</p>
      <p class="text-gray-600 font-medium">{{ muridData.hp }}</p>
      <p class="text-gray-600 font-medium">{{ muridData.email }}</p>
    </div>
  </div>
  <!-- Jenis Kelamin -->
  <v-divider class="my-4" />
  <div class="py-2 flex items-center">
    <h2 class="text-gray-800 font-bold text-lg">Jenis Kelamin</h2><a class="ml-3 font-semibold text-blue-500 text-sm cursor-pointer" @click="editNipdForm">Edit</a>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Jenis Kelamin</p>
    <div class="text-right">
      <p class="text-gray-600 font-medium flex gap-2 items-center justify-end" v-if="muridData.jenis_kelamin">
        <span :class="muridData.jenis_kelamin === 'Pria' ? 'mdi-gender-male text-blue-500' : 'mdi-gender-female text-pink-500'" class="mdi text-xl"></span>
        {{ muridData.jenis_kelamin }}
      </p>
    </div>
  </div>

  <v-divider class="my-4" />

  <!-- Tanggal Created & Updated -->
  <div class="py-2">
    <h2 class="text-gray-800 font-bold text-lg">Tanggal</h2>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Created Date</p>
    <div class="text-right" v-if="muridData.createdAt">
      <p class="text-gray-600 flex items-center justify-end gap-2">
        <CalendarDaysIcon class="h-4 w-4 text-gray-700"></CalendarDaysIcon>{{ formatDate(muridData.createdAt) }}
      </p>
      <p class="text-gray-600 flex items-center justify-end gap-2">
        <ClockIcon class="h-4 w-4 text-gray-700"></ClockIcon>{{ formatTime(muridData.createdAt) }}
      </p>
    </div>
  </div>
  <div class="flex justify-between items-center py-2">
    <p class="text-gray-600 font-semibold">Updated Date</p>
    <div class="text-right" v-if="muridData.updatedAt">
      <p class="text-gray-600 flex items-center justify-end gap-2">
        <CalendarDaysIcon class="h-4 w-4 text-gray-700"></CalendarDaysIcon>{{ formatDate(muridData.updatedAt) }}
      </p>
      <p class="text-gray-600 flex items-center justify-end gap-2">
        <ClockIcon class="h-4 w-4 text-gray-700"></ClockIcon>{{ formatTime(muridData.updatedAt) }}
      </p>
    </div>
  </div>
  
  <v-divider class="my-4" />
  
  <!-- Status -->
  <div class="py-2">
    <p class="text-gray-600 font-semibold">Status</p>
    <div class="mt-4">
      <button v-if="muridData.status === 'Active'"
        class="w-full bg-gradient-to-r from-red-700 to-red-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2"
        @click="rubahStatus(muridData.user_id, 'Inactive')">
        <NoSymbolIcon class="h-4 w-4 text-white"></NoSymbolIcon>
        Tidak Aktif
      </button>
      <button v-else
        class="w-full bg-gradient-to-r from-green-700 to-green-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2"
        @click="rubahStatus(muridData.user_id, 'Active')">
        <ShieldCheckIcon class="h-4 w-4 text-white"></ShieldCheckIcon>
        Aktif
      </button>
    </div>
  </div>
</div>
        <div class="w-1/4 p-4">
          <div class="flex justify-end py-2 gap-2">
            <button :class="ButtonClassStatus(muridData.status)">
              {{ muridData.status }}
            </button>
            <button class="text-gray-600">
              <Cog6ToothIcon class="h-6 w-6 text-gray-600 mr-1" /></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Tampilkan pesan jika muridData belum ada -->
    <NotFound v-else />
  </div>

</template>
<style src="@assets/css/css_404.css"></style>
<style src="@assets/css/loading.css"></style>
<script>
        import {
          changeFoto,
        } from '@/services/murid/Murid.js';
        import { Form, Field, ErrorMessage } from 'vee-validate';
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
        import { getMuridsById } from '@/services/murid/Murid.js';
        import NotFound from '../../NotFoundPage/NotFound.vue';
        import Swal from 'sweetalert2';
        import {
          defineComponent,
          ref
        } from 'vue';
        import defaultPicture from '@/assets/img/Person.jpg'; // Import the image
        import {
          Cropper
        } from 'vue-advanced-cropper';
        import 'vue-advanced-cropper/dist/style.css';
        import { useToast } from "vue-toastification";
        
  export default {
    components: {
      NotFound,
      Cropper
    },
  

  data() {
    return {
      toast: useToast(), 
      muridData: null, // Inisialisasi data pengguna
      isLoading: true,
      isNotFound: false,
      file: null,
      isModalOpenPreview : false,
      editFoto: false,
      confirmFile: false,
      muridFiles: '',
      muridFile64: '',
      title: '',
      isModalOpen: false,
      isUploading: false,
      show: false,
    };
  },
  setup() {
      const toast = useToast();
      return { toast }
    },
  created() {
    // Ketika komponen dibuat, panggil metode untuk mengambil data pengguna
    this.fetchMuridData(this.$route.params.id_murid);
  }, 
  methods: {
    async uploadFile() {
        this.isUploading = true;
        try {
          if (!this.file) {
            throw new Error('Not a file to upload');
          }
          const file = this.DataURIToBlob(this.muridFile64);
          const formData = new FormData();
          formData.append('file', file); // Tambahkan file ke FormData
          const response = await changeFoto(this.$route.params.id_murid, formData);
          await Swal.fire({
            icon: "success",
            title: "Successfully updated photo",
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
    confirmUpload() {
        if (this.muridFile64 && this.file) {
          this.muridFile = this.muridFile64
          this.confirmFile = true; // Menandai file sudah dikonfirmasi
          this.isModalOpen = false; // Menutup modal
        } else {
          alert("File is Unknown");
        }
      },
    change({
        coordinates,
        canvas
      }) {
        const hoi = canvas.toDataURL();
        this.show = true
        this.muridFile64 = hoi
        console.log(this.muridFile64)
      },
    openModalFoto() {
        if (this.file) {
          this.muridFiles = URL.createObjectURL(this.file); // Menampilkan gambar yang dipilih saat modal dibuka
          this.isModalOpen = true;
          document.addEventListener('keydown', this.handleEsc);
        } else {
          this.file = null;
          this.isModalOpen = false;
          // Handle case where no file is selected
          this.toast.info("Please select a file first");
        }
      },
    handleFileUpload(event) {
        const file = event.target.files[0];
        this.file = file; // Simpan file untuk digunakan saat upload
        this.confirmFile = false; // Reset konfirmasi
        this.openModalFoto(); // Tampilkan modal untuk crop gambar
        console.log(this.file);
        event.target.value = null
      },
    handleEsc(event) {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      },
    triggerFileInput() {
        this.editFoto = true
        // Panggil metode click pada elemen input file
        this.$refs.fileInput.$el.click();
        this.title = "Crop Image";
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
    closeModal() {
        this.editFoto = false
        this.isModalOpen = false;
        this.isModalOpenPreview = false;
        this.file = null;
        this.userFiles = '';
        document.removeEventListener('keydown', this.handleEsc);
      },
    ButtonClassStatus(status) {
      // Tentukan kelas CSS berdasarkan nilai peran
      if (status === 'Inactive') {
        return 'bg-gradient-to-r from-red-500 to-red-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
      } else if (status === 'Active') {
        return 'bg-gradient-to-r from-green-500 to-green-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
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
    
    async fetchMuridData(item) {
      setTimeout(async () => {
        const murid = await getMuridsById(item);
        this.muridData = murid;
        this.isLoading = false;
        if (murid && murid.file && murid.file.data && murid.file.data.length > 0) {
          // Convert buffer to blob
          const blob = new Blob([new Uint8Array(murid.file.data)], {
            type: murid.fileMimeType 
          });
          // Create URL from blob
          this.muridFile = URL.createObjectURL(blob);
        } else {
          // Handle if there's no image data
          this.muridFile = ''; // Set default image or show placeholder
          this.isNotFound = true;
        }
        if (!murid) {
          this.isNotFound = true;
        }
      }, 500); // Contoh waktu penundaan 2 detik
  },
  
  },
};

        
</script>