<script setup>
import { useToast } from 'vue-toastification';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const toast = useToast();

const showToast = () => {
  toast.error('Gagal memuat data pengguna.');
};
</script>
<template>
  <div class="flex-none lg:flex  lg:justify-between">
  <!-- Search Field -->
  <div class="flex-none mt-2 lg:flex"> <!-- Container untuk pencarian -->
    <SearchPengguna @search="handleSearch"/>
  </div>

  <div class="flex lg:flex items-center justify-center mt-2 "> <!-- Container untuk elemen-elemen di sebelah kanan -->
    <!-- Tambah Pengguna-->
    <TambahPengguna @open-modal="toogleModal"/>
    <!-- Tambah Lead-->
    <LeadModal :show="isOpen" @close-modal="toogleModal"/>
    <!-- Filter-->
    <FilterStatus @filter="handleFilterStatus"/>
    <FilterRole @filter="handleFilterRole"/>
  </div>
</div>
<div class="mt-4">
<v-card flat>
    <v-data-table :headers="headers" :items="filteredItems" fixed-header height="570px" :loading="loading" hover>
    <!-- Here Action Column -->
    <template #[`item.index`]="{ index }">
      {{ index + 1 }}
      </template>
      <template #[`item.user_id`]="{ item }">
        <div class="flex relative gap-2 text-center items-center">
          <span :class="{ 'blur-sm': blurActive }"  class="select-none copy-btn">{{ item.user_id }}</span>
          <button @click="copyToClipboard(item.user_id)" >
            <ClipboardDocumentIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClipboardDocumentIcon>
        </button>
        <button @click="toggleBlur(item.user_id)" >
            <EyeIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></EyeIcon>
        </button>
        </div>
      </template>
      <template #[`item.username`]="{ item }">
        <div class="flex items-center text-center">
          <div class="flex mr-2">
              <img :src="getUserFileUrl(item)" className="w-10 h-10 object-cover rounded-full border border-gray-200" alt="Profile Picture"/>
            </div>
          {{ item.username }}
        </div>
      </template>
      <template #[`item.role`]="{ item }">
        <button :class="getButtonClassRole(item.role)">
          {{ item.role }}
        </button>
      </template>
      <template #[`item.status`]="{ item }">
        <button :class="getButtonClassStatus(item.status)">
          {{ item.status }}
        </button>
      </template>
      <template #[`item.createdAt`]="{ item }">
        <div class="flex font-semibold relative gap-2 text-center items-center"><CalendarDaysIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></CalendarDaysIcon>{{ formatDate(item.createdAt) }}</div>
        <div class="flex relative gap-2 text-center items-center"><ClockIcon class="h-4 w-4 text-gray-700 text-center justify-center items-center"></ClockIcon>{{ formatTime(item.createdAt) }}</div>         
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="flex relative gap-2 text-center items-center">
              <Menu as="div" class="relative flex text-center ">
                <router-link
                :to="{ path: `/admin/manajemen-pengguna/edit/user/${item.user_id}`, params: { user_id: item.user_id  } }"
                  class="inline-flex w-full justify-center items-center text-sm font-semibold text-gray-700 "
                  >
                  <PencilSquareIcon
                  class="h-5 w-5 text-gray-700 text-center hover:text-gray-500"
                />
                </router-link>
              </Menu>
              <Menu as="div" class="relative flex text-center ">
        <MenuButton
        @click="HandlerDeleteUser(item)" class="inline-flex w-full justify-center items-center text-sm font-semibold text-gray-700 "
        :disabled="isAdmin(item.role)"
        :style="{ cursor: isAdmin(item.role) ? 'not-allowed' : 'pointer' }">
          <TrashIcon
            class="h-5 w-5 text-center"
            :class="{ 'text-gray-400': isAdmin(item.role), 'hover:text-gray-500': !isAdmin(item.role) }"
          />
        </MenuButton>
              </Menu>
              <Menu as="div" class="relative flex text-center ">
        <MenuButton
          class="inline-flex w-full justify-center items-center text-sm font-semibold text-gray-700 "
          @click="loadMore(item)"
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

import SearchPengguna from "./SearchPengguna.vue";
import FilterStatus from "./FilterStatus.vue";
import TambahPengguna from "./TambahPengguna.vue";
import { useToast } from "vue-toastification";
import LeadModal from "./ModalTambah/LeadModal.vue";
import FilterRole from "./FilterRole.vue";
import { getAllUsers, deleteUser } from '@/services/pengguna/Pengguna.js';
import { ChevronDownIcon, PencilSquareIcon, TrashIcon, EyeIcon, NoSymbolIcon, CalendarDaysIcon, SunIcon, MoonIcon} from '@heroicons/vue/20/solid';
import { ClipboardDocumentIcon, ClockIcon } from '@heroicons/vue/24/outline';
import Clipboard from 'clipboard';
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useModalStore } from '@/stores/StoresPengguna.js';
import { refreshToken } from '@/services/refreshToken/refreshToken.js';
import { jwtDecode } from "jwt-decode";

  export default {

    components: {
      TambahPengguna,
      FilterRole,
      FilterStatus,
      SearchPengguna,
      LeadModal,
    },
    data() {
  return {
    toast: useToast(),
    loading: true,
    filterStatus: '',
    filterRole: '',
    searchKeyword: '',
    userFile: null,
    blurActive: true,
    showDropdownIndex: null,
    isOpen: false,
    items: [],
    headers: [
      { title: '#', align: 'start', value: 'index', sortable: false, width: '50px' },
      { title: 'User ID', key: 'user_id', align: 'start'},
      { title: 'Username', key: 'username', align: 'start'},
      { title: 'Role', key: 'role', align: 'start', width: '145px' },
      { title: 'Created', key: 'createdAt', align: 'start' },
      { title: 'Status', key: 'status', align: 'start' },
      { title: 'Action', value: 'actions', align: 'start', width: '50px' },
    ],
  }
},
setup() {
  const toast = useToast();
  return { toast }
},  
mounted() {
    this.fetchAllUsers();
},
computed: {
    filteredItems() {
      let filteredItems = this.items
      const searchKeywordLower = this.searchKeyword.toLowerCase();
      // Filter berdasarkan pencarian
      if (this.searchKeyword) {
        filteredItems = filteredItems.filter(item => {
          return item.user_id.includes(this.searchKeyword) || item.username.includes(searchKeywordLower || this.searchKeyword)
        })
      }

      // Filter berdasarkan status
      if (this.filterStatus) {
        filteredItems = filteredItems.filter(item => {
          return item.status === this.filterStatus
        })
      }

      // Filter berdasarkan status
      if (this.filterRole) {
        filteredItems = filteredItems.filter(item => {
          return item.role === this.filterRole
        })
      }
      return filteredItems
    }
  },
 methods: {
    showtoas(){
      this.toast.info("Heehe");
    },
      getUserFileUrl(user) {
      // Kembalikan URL gambar pengguna jika tersedia, jika tidak kembalikan string kosong
      return user.file ? user.file : '';
    },
      handleFilterRole(role) {
      this.filterRole = role
    },
      handleFilterStatus(status) {
      this.filterStatus = status
    },
      handleSearch(event) {
      this.searchKeyword = event
    },
      isAdmin(role) {
      // Fungsi untuk memeriksa apakah peran adalah "Admin"
      return role === 'Admin';
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
      getButtonClassRole(role) {
      // Tentukan kelas CSS berdasarkan nilai peran
      if (role === 'Admin') {
        return 'bg-gradient-to-r from-green-500 to-green-400 px-2 py-1 rounded text-white select-none text-sm font-semibold cursor-default text-sm';
      } else if (role === 'User') {
        return 'bg-gradient-to-r from-blue-500 to-blue-400 px-2 py-1 rounded text-white select-none text-sm font-semibold cursor-default text-sm';
      }
    },
    getButtonClassStatus(status) {
      // Tentukan kelas CSS berdasarkan nilai peran
      if (status === 'Inactive') {
        return 'bg-gradient-to-r from-red-500 to-red-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
      } else if (status === 'Active') {
        return 'bg-gradient-to-r from-green-500 to-green-400 font-semibold px-2 py-1 rounded text-white select-none cursor-default text-sm';
      }
    },
    async HandlerDeleteUser(item) {
      try {
        if (item.role === 'Admin') {
          Swal.fire({
            title: "Error",
            text: `You are not allowed to delete a Admin.`,
            icon: "error"
          });
          return; // Stop execution if user is Super Admin
        }

        const whoLogged = await refreshToken();
        const decodedToken = jwtDecode(whoLogged);        
        if(decodedToken.role === "User"){
          Swal.fire({
            title: "Error",
            text: `(Forbidden) Role user cannot deleted another user/admin.`,
            icon: "error"
          });
          return; // Stop execution if user is Super Admin
        }
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
          deleteUser(item.user_id, decodedToken.user_id);
          this.fetchAllUsers();
          Swal.fire({
            title: "Deleted!",
            text: `${item.username} has been deleted.`,
            icon: "success"
          });
        }
        });
      } catch (error) {
        console.error('Failed to delete user:', error);
        Swal.fire({
          title: "Error",
          text: `Failed to delete ${item.username}. Please try again later.`,
          icon: "error"
        });
      }
    },
    getUserFileUrl(user) {
      const index = this.items.indexOf(user);
      return this.userFile[index];
    },
      async fetchAllUsers() {
      try {
        // Panggil fungsi getAllUsers untuk mendapatkan data semua pengguna
        const whoLogged = await refreshToken();
        const decodedToken = jwtDecode(whoLogged);
        if (decodedToken.role !== 'Admin') {
          console.log('Only admins can fetch all users.');
          this.items = [];
          this.userFile = [];
          this.loading = false;
          return;
        }
        const user = await getAllUsers();
        this.items = user;
        this.userFile = user.map(user => {
        // Ubah BLOB menjadi URL gambar
        if (user && user.file && user.file.data && user.file.data.length > 0) {
          const blob = new Blob([new Uint8Array(user.file.data)], { type: user.fileMimeType });
          return URL.createObjectURL(blob);
        }else{
          this.userFile = '';
        }
      });
        this.loading = false;
      } catch (error) {
        console.error('Failed to fetch users data:', error);
        this.loading = false;
      }
    },
      toogleModal() {
        this.isOpen = !this.isOpen;
      },
      toggleDropdown(index) {
      this.showDropdownIndex = this.showDropdownIndex === index ? null : index;
      },
      viewItem(item) {
        console.log('Lihat:', item);
      },
      inActiveItem(item) {
        console.log('Nonaktifkan:', item);
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