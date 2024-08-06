<script setup>
import { useToast } from 'vue-toastification';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>

<template>
  <div class="flex-none lg:flex  lg:justify-between">
  <!-- Search Field -->
  <div class="flex-none mt-2 lg:flex"> <!-- Container untuk pencarian -->
    <SearchMurid @search="handleSearch"/>
  </div>

  <div class="flex lg:flex items-center justify-center mt-2 "> <!-- Container untuk elemen-elemen di sebelah kanan -->
    <!-- Tambah Murid-->
    <TambahMurid @open-modal="toogleModal"/>
    <!-- Tambah Lead-->
    <LeadModal :show="isOpen" @close-modal="toogleModal"/>
    <!-- Filter-->
    <FilterJK @filter="handleFilterJK"/>
  </div>
</div>
<div class="mt-4">
<v-card flat>
    <v-data-table :headers="headers" :items="filteredItems" fixed-header height="570px" :loading="loading" hover>
    <!-- Here Action Column -->
    <template #[`item.index`]="{ index }">
      {{ index + 1 }}
      </template>
      <template #[`item.nis`]="{ item }">
        <div class="flex relative gap-2 text-center items-center">
          <span :class="{ 'blur-sm': blurActive }"  class="select-none copy-btn">{{ item.nis }}</span>
          <button @click="copyToClipboard(item.nis)" >
            <ClipboardDocumentIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClipboardDocumentIcon>
        </button>
        <button @click="toggleBlur(item.nis)" >
            <EyeIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></EyeIcon>
        </button>
        </div>
      </template>
      <template #[`item.file`]="{ item }">
        <div class="flex items-center text-center">
          <div class="flex mr-2">
              <img :src="getMuridFileUrl(item)" className="w-10 h-10 object-cover rounded-full border border-gray-200" alt="Profile Picture"/>
            </div>
        </div>
      </template>
      <template #[`item.nama_lengkap`]="{ item }">
        {{ item.nama_lengkap }}
      </template>
      <template #[`item.jenis_kelamin`]="{ item }">
        <template v-if="item.jenis_kelamin === 'Pria'">
          <div class="flex pb-3 justify-center items-center text-center">
            <male-icon class="h-3 w-3 text-blue-500 text-center  justify-center items-center mr-5"/>
          </div>
        </template>
        <template v-else-if="item.jenis_kelamin === 'Wanita'">
          <div class="flex pb-3 justify-center items-center text-center">
          <female-icon class="h-3 w-3 text-pink-500 text-center  items-center mr-5"/>
          </div>
        </template>
      </template>
      <template #[`item.tanggal_lahir`]="{ item }">
        <button :class="getButtonClassYear(item.tanggal_lahir)">
          {{ item.tanggal_lahir }}
        </button>
      </template>
      <template #[`item.tempat_lahir`]="{ item }">
          {{ item.tempat_lahir }}
      </template>
      <template #[`item.createdAt`]="{ item }">
        <div class="flex font-semibold relative gap-2 text-center items-center"><CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></CalendarDaysIcon>{{ formatDate(item.createdAt) }}</div>
        <div class="flex relative gap-2 text-center items-center"><ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>{{ formatTime(item.createdAt) }}</div>         
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="flex relative gap-2 text-center items-center">
              <Menu as="div" class="relative flex text-center ">
                <router-link
                :to="{ path: `/admin/manajemen-murid/edit/murid/${item.id_murid}`, params: { id_murid: item.id_murid  } }"
                  class="inline-flex w-full justify-center items-center text-sm font-semibold text-gray-700 "
                  >
                  <PencilSquareIcon
                  class="h-5 w-5 text-gray-700 text-center hover:text-gray-500"
                />
                </router-link>
              </Menu>
              <Menu as="div" class="relative flex text-center ">
        <MenuButton
        @click="HandlerDeleteMurid(item)" class="inline-flex w-full justify-center items-center text-sm font-semibold text-gray-700 ">
          <TrashIcon
            class="h-5 w-5 text-center text-gray-700 hover:text-gray-500"
          />
        </MenuButton>
              </Menu>
              <Menu as="div" class="relative flex text-center ">
        <MenuButton
          class="inline-flex w-full justify-center items-center text-sm font-semibold text-gray-700"
        >
          <EyeIcon
          class="h-5 w-5 text-gray-700 text-center hover:text-gray-500"
          />
        </MenuButton>
              </Menu>
            </div>
  </template>
    </v-data-table>
  </v-card>
</div>
</template>
<script>

import SearchMurid from "./SearchMurid.vue";
import FilterJK from "./FilterJK.vue";
import TambahMurid from "./TambahMurid.vue";
import { useToast } from "vue-toastification";
import LeadModal from "./ModalTambah/LeadModal.vue";
import { getAllMurids, deleteMurid } from '@/services/Murid.js';
import { ChevronDownIcon, PencilSquareIcon, TrashIcon, EyeIcon, NoSymbolIcon, CalendarDaysIcon, SunIcon, MoonIcon} from '@heroicons/vue/20/solid';
import FemaleIcon from 'vue-material-design-icons/GenderFemale.vue';
import MaleIcon from 'vue-material-design-icons/GenderMale.vue';
import { ClipboardDocumentIcon, ClockIcon } from '@heroicons/vue/24/outline';
import Clipboard from 'clipboard';
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useModalStore } from '@/stores/StoresPengguna.js';

  export default {

    components: {
      FemaleIcon,
      MaleIcon,
      TambahMurid,
      FilterJK,
      SearchMurid,
      LeadModal
    },
    data() {
  return {
    toast: useToast(),
    loading: true,
    filterJenisKelamin: '',
    searchKeyword: '',
    muridFile: null,
    blurActive: true,
    showDropdownIndex: null,
    isOpen: false,
    items: [],
    headers: [
      { title: '#', align: 'start', value: 'index', sortable: false, width: '50px', height: '200px' },
      { title: 'NIS', key: 'nis', align: 'start', width: '50px', height: '200px' },
      { title: 'Foto', key: 'file', align: 'start', width: '50px', height: '200px' },
      { title: 'Nama Lengkap', key: 'nama_lengkap', align: 'start'},
      { title: 'Jenis Kelamin', key: 'jenis_kelamin', align: 'center', height: '10px' },
      { title: 'Tempat Lahir', key: 'tempat_lahir', align: 'start', height: '200px' },
      { title: 'Tanggal Lahir', key: 'tanggal_lahir', align: 'start', height: '50px' },
      { title: 'Created', key: 'createdAt', align: 'start' , disableSort: false},
      { title: 'Action', value: 'actions', align: 'start', width: '50px', height: '200px'  },
    ],
  }
},
setup() {
  const toast = useToast();
  return { toast }
},  
mounted() {
    this.fetchAllMurids();
},
computed: {
    filteredItems() {
      let filteredItems = this.items
      const searchKeywordLower = this.searchKeyword.toLowerCase();
      // Filter berdasarkan pencarian
      if (this.searchKeyword) {
        filteredItems = filteredItems.filter(item => {
          return item.nama_lengkap.toLowerCase().includes(searchKeywordLower || this.searchKeyword)
        })
      }

        // Filter berdasarkan status
        if (this.filterJenisKelamin) {
          filteredItems = filteredItems.filter(item => {
        return item.jenis_kelamin === this.filterJenisKelamin
        })
      }
      // Filter berdasarkan status
      return filteredItems
    }
  },
 methods: {
      getMuridFileUrl(murid) {
      // Kembalikan URL gambar pengguna jika tersedia, jika tidak kembalikan string kosong
      return murid.file ? murid.file : '';
    },
      handleFilterJK(item) {
      this.filterJenisKelamin = item
    },
      handleSearch(event) {
      this.searchKeyword = event
    },
      toggleBlur(text) {
        this.blurActive = !this.blurActive;
        console.log(text)
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
      copyToClipboard(text) {
      // Buat instance Clipboard
      navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard:', text);
      }).catch((error) => {
      console.error('Failed to copy text:', error);
      });
      },
    getButtonClassYear(item) {
      // Tentukan kelas CSS berdasarkan nilai peran
      const date = item;
      const year = parseInt(date.split('-')[0], 10); // Ekstrak tahun dan konversi ke integer

      if (year % 2 === 0) {
        return 'bg-gradient-to-r from-blue-500 to-blue-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
      } else{
        return 'bg-gradient-to-r from-red-500 to-red-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
      }
    },

    async HandlerDeleteMurid(item) {
      try {
        const result = await Swal.fire({
          title: "Anda yakin?",
          text: `Anda tidak akan dapat mengembalikan ini!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#AE1A1A",
          cancelButtonColor: "#D1CFCE",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
          deleteMurid(item.id_murid);
          this.fetchAllMurids();
          Swal.fire({
            title: "Deleted!",
            text: `${item.nama_lengkap} has been deleted.`,
            icon: "success"
          });
        }
        });
      } catch (error) {
        console.error('Failed to delete murid:', error);
        Swal.fire({
          title: "Error",
          text: `Failed to delete ${item.nama_lengkap}. Please try again later.`,
          icon: "error"
        });
      }
    },
    getMuridFileUrl(murid) {
      const index = this.items.indexOf(murid);
      return this.muridFile[index];
    },
      async fetchAllMurids() {
      try {
        // Panggil fungsi getAllMurids untuk mendapatkan data semua pengguna
        const murid = await getAllMurids();
        this.items = murid;
        this.muridFile = murid.map(murid => {
        // Ubah BLOB menjadi URL gambar
        if (murid && murid.file && murid.file.data && murid.file.data.length > 0) {
          const blob = new Blob([new Uint8Array(murid.file.data)], { type: murid.fileMimeType });
          return URL.createObjectURL(blob);
        }else{
          this.muridFile = '';
        }
      });
        this.loading = false;
      } catch (error) {
        console.error('Failed to fetch murids data:', error);
        this.loading = false;
      }
    },
      toogleModal() {
        this.isOpen = !this.isOpen;
      },
      // toogleModalEdit(item){ 
      //   const penggunaStores = useModalStore();
      //   penggunaStores.setItemSelected(item);
      // },
      toggleDropdown(index) {
      this.showDropdownIndex = this.showDropdownIndex === index ? null : index;
      // console.log(this.showDropdownIndex)
      },
      viewItem(item) {
        console.log('Lihat:', item);
        // Logic to handle view action
      },
      inActiveItem(item) {
        console.log('Nonaktifkan:', item);
        // Logic to handle view action
      },
  },
  }
</script>

<style>
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  font-weight: bold;
  color: gray;
}

.blur-sm {
  /* Atur gaya blur di sini */
  filter: blur(5px);
}
</style>