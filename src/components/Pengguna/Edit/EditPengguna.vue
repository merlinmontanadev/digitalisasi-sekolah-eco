<script setup>
  import {
    UserGroupIcon,
    ChevronLeftIcon,
    Cog6ToothIcon
  } from "@heroicons/vue/24/outline";
  import {
    PencilSquareIcon
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
</script>
<template>
  <router-link to="/admin/manajemen-pengguna">
    <v-btn variant="outlined" color="primary" v-if="userData">
      <ChevronLeftIcon class="h-6 w-6 text-blue-600 mr-1" /> Kembali
    </v-btn>
  </router-link>
  <div v-if="isLoading" class="loader mx-[50%] my-40"></div>
  <div v-else>
    <div class="mt-4 bg-white h-full w-full rounded-lg shadow" v-if="userData">
      <div class="flex bg-slate-100 gap-2 text-center items-center py-4 px-4">
        <PencilSquareIcon class="h-6 w-6 text-blue-700" />
        <h1 class="font-bold text-xl text-blue-700">Edit Manajemen Pengguna</h1>
      </div>
      <hr class="w-full">
      <div class="flex center ">
        <div class="flex w-full my-4">
          <div class="container mx-auto">
            <div class="flex justify-center">
              <div class="bg-white overflow-hidden w-full flex">
                <div class="w-1/4 p-4 flex-nowrap">
                  <div class="text-center h-64 w-64">
                    <img class="h-64 w-64 mx-auto" :src="userFile" id="uploaded-image" alt="Profile Picture">
                    <div class="mt-2">
                      <Field ref="fileInput" id="file-upload" type="file" class="hidden" accept="image/*" name="file"
                        @change="handleFileUpload" />
                      <button
                        class="w-full bg-gradient-to-r from-blue-700 to-blue-500 font-semibold rounded text-white select-none"
                        @click="triggerFileInput">Ganti Foto</button>
                      <button
                        class="w-full bg-gradient-to-r from-green-500 to-green-500 font-semibold mt-2 rounded text-white select-none"
                        v-if="confirmFile" :disabled="isUploading" :class="{ 'cursor-not-allowed': isUploading }"
                        @click="uploadFile">
                        <span v-if="isUploading">Loading...</span>
                        <span v-else>Simpan</span>
                      </button>
                    </div>
                    <TransitionRoot as="template" :show="isModalOpen">
                      <Dialog as="div" class="fixed inset-0 overflow-y-auto" @close="closeModal">
                        <div
                          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true">&#8203;</span>
                          <div
                            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div class="sm:flex sm:items-start justify-center">
                                <div class="text-center w-full">
                                  <DialogTitle class="flex items-center justify-between mb-4">
                                    <div class="text-lg font-bold leading-7">Crop Image</div>
                                  </DialogTitle>
                                  <!-- Cropper here -->
                                  <cropper ref="cropper" id="cropper" class="h-64 w-64 mx-auto" 
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
                                </div>
                              </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button type="button"
                                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="closeModal">
                                Cancel
                              </button>
                              <button type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-green-500 to-green-500 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="confirmUpload">
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </TransitionRoot>
                  </div>
                </div>
                <div class="w-3/6 p-4">
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">UserID</p>
                    <div class="text-right">
                      <h1 class="text-gray-600">{{ userData.user_id }}</h1>
                    </div>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Username</p>
                    <div class="text-right">
                      <h1 class="text-gray-600">{{ userData.username }}</h1>
                    </div>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Role</p>
                    <div class="text-right">
                      <button :class="ButtonClassRole(userData.role)">
                        {{ userData.role }}
                      </button>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Informasi Kontak</p>
                    <div class="text-right">
                      <p class="text-gray-600 font-medium">{{ userData.email }}</p>
                      <p class="text-gray-600 font-medium">{{ userData.nohp }}</p>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Jenis Kelamin</p>
                    <div class="text-right">
                      <p class="text-gray-600 font-medium flex gap-2 items-center justify-end" v-if="userData.jk">
                        <span
                          :class="userData.jk === 'Pria' ? 'mdi-gender-male text-blue-500' : 'mdi-gender-female text-pink-500'"
                          class="mdi text-xl"></span>
                        {{ userData.jk }}
                      </p>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="flex justify-between items-center py-2">
                    <p class="text-gray-600 font-semibold">Created Date</p>
                    <div class="text-right" v-if="userData.createdAt">
                      <p class="text-gray-600  flex items-center justify-end gap-2">
                        <CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center">
                        </CalendarDaysIcon>{{ formatDate(userData.createdAt) }}
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
                        </CalendarDaysIcon>{{ formatDate(userData.updatedAt) }}
                      </p>
                      <p class="text-gray-600  flex items-center justify-end gap-2">
                        <ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>
                        {{ formatTime(userData.updatedAt) }}
                      </p>
                    </div>
                  </div>
                  <v-divider class="my-4" />
                  <div class="py-2">
                    <p class="text-gray-600 font-semibold">Kata Sandi</p>
                    <div class="mt-4">
                      <button
                        class="w-full bg-gradient-to-r from-blue-700 to-blue-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2"
                        @click="ResetPasswordPengguna(userData.user_id)">
                        <KeyIcon class="h-4 w-4 text-white"></KeyIcon>Reset Kata Sandi
                      </button>
                    </div>
                  </div>
                  <div class="py-2">
                    <p class="text-gray-600 font-semibold">Device</p>
                    <div class="mt-4"><button
                        class="w-full bg-gradient-to-r from-red-700 to-red-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2">
                        <TrashIcon class="h-4 w-4 text-white"></TrashIcon>Hapus Device
                      </button></div>
                  </div>
                  <div class="py-2">
                    <p class="text-gray-600 font-semibold">Status Akun</p>
                    <div class="mt-4">
                      <button v-if="userData.status === 'Active'"
                        class="w-full bg-gradient-to-r from-red-700 to-red-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2"
                        @click="rubahStatus(userData.user_id, 'Inactive')">
                        <NoSymbolIcon class="h-4 w-4 text-white"></NoSymbolIcon>
                        Non Aktifkan
                      </button>
                      <button v-else
                        class="w-full bg-gradient-to-r from-green-700 to-green-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2"
                        @click="rubahStatus(userData.user_id, 'Active')">
                        <ShieldCheckIcon class="h-4 w-4 text-white"></ShieldCheckIcon>
                        Aktifkan
                      </button>
                    </div>
                  </div>
                </div>
                <div class="w-1/4 p-4">
                  <div class="flex justify-end py-2 gap-2">
                    <button :class="ButtonClassStatus(userData.status)">
                      {{ userData.status }}
                    </button>
                    <button class="text-gray-600">
                      <Cog6ToothIcon class="h-6 w-6 text-gray-600 mr-1" /></button>
                  </div>
                </div>
              </div>
            </div>
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
  import {
    defineComponent
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
    changeFoto
  } from '@/services/pengguna/Pengguna.js';
  import NotFound from '../../NotFoundPage/NotFound.vue';
  import Swal from 'sweetalert2';

  export default {
    components: {
      NotFound,
      Cropper,
    },

    data() {
      return {
        userData: null, // Inisialisasi data pengguna
        isLoading: true,
        isNotFound: false,
        userFiles: '',
        userFile64: '',
        file: null,
        isModalOpen: false,
        confirmFile: false,
        show: false,
        isUploading: false,
      };
    },
    created() {
      // Ketika komponen dibuat, panggil metode untuk mengambil data pengguna
      this.fetchUserData(this.$route.params.user_id);
    },
    methods: {
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

          this.confirmFile = false;
          await Swal.fire({
            icon: "success",
            title: "Foto berhasil diupdate",
            showConfirmButton: false,
            timer: 1500
          });
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
          // Handle case where no file is selected
          alert("Please select a file first");
        }
      },
      closeModal() {
        this.isModalOpen = false;
        this.file = null;
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
      triggerFileInput() {
        // Panggil metode click pada elemen input file
        this.$refs.fileInput.$el.click();
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
        } else if (role === 'Super Admin') {
          return 'bg-gradient-to-r from-yellow-500 to-yellow-400 px-2 py-1 rounded text-white select-none cursor-default text-sm font-semibold';
        } else if (role === 'User') {
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
          console.log('User Detail:', user.file);
          if (user && user.file && user.file.data && user.file.data.length > 0) {
            // Convert buffer to blob
            const blob = new Blob([new Uint8Array(user.file.data)], {
              type: user.fileMimeType
            });
            // Create URL from blob
            this.userFile = URL.createObjectURL(blob);
            console.log('User File:', this.userFile);
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