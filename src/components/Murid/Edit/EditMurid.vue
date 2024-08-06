<script setup>
        import {UserGroupIcon,ChevronLeftIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline";
        import {
                PencilSquareIcon
        } from '@heroicons/vue/20/solid';
        import {
                Menu,
                MenuButton,
                MenuItem,
                MenuItems
        } from '@headlessui/vue'    
</script>
<template>
        <router-link to="/admin/manajemen-murid" >
            <v-btn variant="outlined" color="primary" v-if="muridData">
                <ChevronLeftIcon class="h-6 w-6 text-blue-600 mr-1" /> Kembali
        </v-btn>
        </router-link>
      <div v-if="isLoading" class="loader mx-[50%] my-40"></div>
      <div v-else>
      <div class="mt-4 bg-white h-full w-full rounded-lg shadow" v-if="muridData">
        <div class="flex bg-slate-100 gap-2 text-center items-center py-4 px-4">
          <PencilSquareIcon class="h-6 w-6 text-blue-700" />
          <h1 class="font-bold text-xl text-blue-700">Edit Manajemen Murid</h1>
        </div>
    <hr class="w-full">
    <div class="flex center ">
    <div class="flex w-full my-4">
        <div class="container mx-auto">
        <div class="flex justify-center">
            <div class="bg-white overflow-hidden w-full flex">
                <div class="w-1/4 p-4 flex-nowrap">
                    <div class="text-center">
                        <img class="h-64 w-64 mx-auto outline outline-2 outline-gray-100" :src="muridFile" id="uploaded-image"   
                            alt="Profile Picture">
                            <div class="mt-2">
                              <Field ref="fileInput" id="file-upload" type="file" class="hidden" accept="image/*" name="file" @change="handleFileUpload"/>
                              <button class="w-full bg-gradient-to-r from-blue-700 to-blue-500 font-semibold px-2 py-1 rounded text-white select-none" @click="triggerFileInput">Ganti Foto</button>
                              <button class="w-full bg-gradient-to-r from-green-500 to-green-500 font-semibold mt-2 px-2 py-1 rounded text-white select-none" v-if="file" @click="uploadFile()">Simpan</button>
                            </div>
                    </div>
                </div>
                <div class="w-3/6 p-4">
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">MuridID</p>
                            <div class="text-right">
                                <h1 class="text-gray-600">{{ muridData.id_murid }}</h1>
                            </div>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">NIPD</p>
                            <div class="text-right">
                                <h1 class="text-gray-600">{{ muridData.nipd }}</h1>
                            </div>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">NIS</p>
                            <div class="text-right">
                                <h1 class="text-gray-600">{{ muridData.nis }}</h1>
                            </div>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">NISN</p>
                            <div class="text-right">
                                <h1 class="text-gray-600">{{ muridData.nisn }}</h1>
                            </div>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">Nama Murid</p>
                            <div class="text-right">
                                <h1 class="text-gray-600">{{ muridData.nama_lengkap }}</h1>
                            </div>
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
                        <v-divider class="my-4"/>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">Informasi Alamat</p>
                            <div class="text-right">
                                <p class="text-gray-600 font-medium">{{ muridData.alamat }}, {{ muridData.kel_des }}, {{ muridData.kec }}, {{ muridData.kab }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">Informasi Kontak</p>
                            <div class="text-right">
                                <p class="text-gray-600 font-medium">{{ muridData.telepon }}</p>
                                <p class="text-gray-600 font-medium">{{ muridData.hp }}</p>
                                <p class="text-gray-600 font-medium">{{ muridData.email }}</p>
                            </div>
                        </div>
                        <v-divider class="my-4"/>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">Jenis Kelamin</p>
                            <div class="text-right">
                                <p class="text-gray-600 font-medium flex gap-2 items-center justify-end" v-if="muridData.jenis_kelamin">
                                  <span :class="muridData.jenis_kelamin === 'Pria' ? 'mdi-gender-male text-blue-500' : 'mdi-gender-female text-pink-500'"
                                  class="mdi text-xl"
                                  ></span>
                                  {{ muridData.jenis_kelamin }}
                                </p>
                            </div>
                        </div>
                        <v-divider class="my-4"/>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">Created Date</p>
                            <div class="text-right" v-if="muridData.createdAt">
                                <p class="text-gray-600  flex items-center justify-end gap-2"><CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></CalendarDaysIcon>{{ formatDate(muridData.createdAt) }}</p>
                                <p class="text-gray-600  flex items-center justify-end gap-2"><ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>{{ formatTime(muridData.createdAt) }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center py-2">
                            <p class="text-gray-600 font-semibold">Updated Date</p>
                            <div class="text-right" v-if="muridData.updatedAt">
                                <p class="text-gray-600  flex items-center justify-end gap-2"><CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></CalendarDaysIcon>{{ formatDate(muridData.updatedAt) }}</p>
                                <p class="text-gray-600  flex items-center justify-end gap-2"><ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>{{ formatTime(muridData.updatedAt) }}</p>
                            </div>
                        </div>
                        <v-divider class="my-4"/>
                        <div class="py-2">
                            <p class="text-gray-600 font-semibold">Status</p>
                                <div class="mt-4">
                                  <button v-if="muridData.status === 'Active'" class="w-full bg-gradient-to-r from-red-700 to-red-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2" @click="rubahStatus(muridData.user_id, 'Inactive')">
                                    <NoSymbolIcon class="h-4 w-4 text-white"></NoSymbolIcon>
                                    Tidak Aktif
                                  </button>
                                  <button v-else class="w-full bg-gradient-to-r from-green-700 to-green-500 font-semibold px-2 py-1 rounded text-white select-none flex items-center text-center justify-center gap-2" @click="rubahStatus(muridData.user_id, 'Active')">
                                    <ShieldCheckIcon class="h-4 w-4 text-white"></ShieldCheckIcon>
                                    Akftif
                                  </button>
                                </div>
                        </div>
                </div>
                <div class="w-1/4 p-4">
                    <div class="flex justify-end py-2 gap-2"> 
                        <button :class="ButtonClassStatus(muridData.status)">
                        {{ muridData.status }}
                        </button>
                        <button class="text-gray-600"><Cog6ToothIcon class="h-6 w-6 text-gray-600 mr-1"/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    </div>
</div>
      </div>
      <!-- Tampilkan pesan jika muridData belum ada -->
      <NotFound v-else/>
    </div>
      
</template>
<style src="@assets/css/css_404.css"></style>
<style src="@assets/css/loading.css"></style>
<script>
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
        import { getMuridsById } from '@/services/Murid.js';
        import NotFound from '../../NotFoundPage/NotFound.vue';
        import Swal from 'sweetalert2';
        import axios from 'axios';
        
  export default {
    components: {
      NotFound,
    },
  
  data() {
    return {
      muridData: null, // Inisialisasi data pengguna
      isLoading: true,
      isNotFound: false,
      muridFile: null,
      file: null
    };
  },
  created() {
    // Ketika komponen dibuat, panggil metode untuk mengambil data pengguna
    this.fetchMuridData(this.$route.params.id_murid);
  }, 
  methods: {
    // async uploadFile() {
    //   try {
    //     const formData = new FormData();
    //     formData.append('file', this.file);
    //     const response = await changeFoto(this.$route.params.user_id, formData);
    //     await Swal.fire({
    //                 icon: "success",
    //                 title: "Foto berhasil diupdate",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //     })
    //     this.file = null;
    //     return response;
    //   } catch (error) {
    //     console.error('Error saat mengupdate data:', error);
    //                 await Swal.fire({
    //                 icon: "error",
    //                 title: "Data gagal disimpan",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //                 })
    //                 throw error; // Melempar kembali error untuk ditangani di luar fungsi ini jika perlu
    //   }
    // },
    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   this.file = file; // Simpan file untuk digunakan saat upload
    //   this.muridFile = URL.createObjectURL(file); // Menampilkan gambar yang dipilih
    // },
    // triggerFileInput() {
    //   // Panggil metode click pada elemen input file
    //   this.$refs.fileInput.$el.click();
    // },
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
    // async ResetPasswordPengguna(item){
    //   Swal.fire({
    //       title: "Anda yakin?",
    //       text: `Anda akan mereset password pengguna ini!`,
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#1A55AE",
    //       cancelButtonColor: "#D1CFCE",
    //       confirmButtonText: "Ya, Reset Password!",
    //       cancelButtonText: "Batal"
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //       const response = await resetPaswword(item);
    //       if (!response) { 
    //         Swal.fire({
    //           icon: "error",
    //           title: "Password gagal direset",
    //           showConfirmButton: false,
    //           timer: 1500
    //         })
    //       return;
    //       }else{
    //         Swal.fire({
    //           title: 'Success',
    //           text: `Password berhasil direset, silahkan login kembali dengan password (12345678)`,
    //           icon: 'success'
    //         });
    //       }
    //       }
    //     });
    // },
    // async rubahStatus(item) {
    //   Swal.fire({
    //       title: "Anda yakin?",
    //       text: `Anda akan mengubah status pengguna ini!`,
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#1A55AE",
    //       cancelButtonColor: "#D1CFCE",
    //       confirmButtonText: "Ya, Ubah Status!",
    //       cancelButtonText: "Batal"
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //       const response = await changeStatus(item);
    //       if (!response) { 
    //         Swal.fire({
    //           icon: "error",
    //           title: "Status gagal diubah",
    //           showConfirmButton: false,
    //           timer: 1500
    //         })
    //       return;
    //       }else{
    //         Swal.fire({
    //           title: 'Success',
    //           text: 'Status pengguna berhasil diubah',
    //           icon: 'success'
    //         });
    //         this.fetchMuridData(this.$route.params.user_id);
    //       }
    //       }
    //     });
    // },
    async fetchMuridData(item) {
      setTimeout(async () => {
        const murid = await getMuridsById(item);
        this.muridData = murid;
        this.isLoading = false;
        console.log('Murid Detail:', murid.file);
        if (murid && murid.file && murid.file.data && murid.file.data.length > 0) {
          // Convert buffer to blob
          const blob = new Blob([new Uint8Array(murid.file.data)], { type: murid.fileMimeType });
          // Create URL from blob
          this.muridFile = URL.createObjectURL(blob);
          console.log('Murid File:', this.muridFile);
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