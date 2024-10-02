import { createWebHistory, createRouter } from "vue-router";
// layouts

import AdminLayout from "@/layouts/AdminLayout.vue";

// views for Auth layout
import Login from "@/views/login/Login.vue";
import Murid from "@/views/murid/Murid.vue";
import GTK from "@/views/gtk/Gtk.vue";
import Alumni from "@/views/alumni/Alumni.vue";
import AbsensiGTK from "@/views/absensi/gtk/AbsensiGTK.vue";
import AbsnsiMurid from "@/views/absensi/murid/AbsensiMurid.vue";
import Pelanggaran from "@/views/pelanggaran/Pelanggaran.vue";
import KategoriPelanggaran from "@/views/kategori_pelanggaran/KategoriPelanggaran.vue";
import Poin from "@/views/poin/Poin.vue";
import BKKList from "@/views/bkk/list/Bkk.vue";
import BKKPerushaan from "@/views/bkk/perusahaan/Perusahaan.vue";
import Cropper from "@/views/cropper/Cropper.vue";
import KelolaSekolah from "@/views/kelola_sekolah/KelolaSekolah.vue";
import Cookies from 'js-cookie';
import { i18n } from '../main.js'; // pastikan untuk mengimpor i18n dari file utama Anda

// routes
const routes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: AdminLayout,
    meta: { title: 'dashboardTitle', requiresAuth: true},
    children: [
      // Tambahkan rute-rute yang terkait dengan dashboard di sini
      {
        path: 'dashboard',
        alias: '/admin/dashboard',
        name: 'Dashboard',
        props: true,
        component: ()=> import('@/views/dashboard/Dashboard.vue'),
        meta: { title: 'dashboardTitle', requiresAuth: true }
      },    
      {
        path: 'users',
        alias: '/admin/user-management',
        component: ()=> import('@/views/pengguna/Pengguna.vue'),
        meta: { title: 'User Management', requiresAuth: true , to: '/admin/user-management/edit/user/'},
        props: true
      },
      {
        path: 'image-test',
        alias: '/admin/manajemen-pengguna/show/images',
        component: ()=> import('@/views/pengguna/ImageShow.vue'),
        meta: { title: 'Test' }
      },
      {
        path: 'edit-user',
        alias: '/admin/user-management/edit/user/:user_id',
        component: ()=> import('@/views/pengguna/EditPengguna.vue'),
        props: true,
        meta: { title: 'Edit User', requiresAuth: true, to: '/admin/user-management/'}
      },  
      {
        path: 'edit-new',
        alias: '/admin/user-management/edit-new',
        component: ()=> import('@/views/pengguna/EditPenggunaNew.vue'),
        props: true,
        meta: { title: 'Edit New User', requiresAuth: true, to: '/admin/user-management/'}
      },  
      {
        path: 'murid',
        alias: '/admin/student-management',
        component: ()=> import('@/views/murid/Murid.vue'),
        meta: { title: 'Student Management', requiresAuth: true }
      },
      {
        path: 'edit-murid',
        alias: '/admin/student-management/edit/murid/:id_murid',
        component: ()=> import('@/views/murid/EditMurid.vue'),
        props: true,
        meta: { title: 'Student Management', requiresAuth: true }
      }, 
      {
        path: 'gtk',
        alias: '/admin/manajemen-gtk',
        component: ()=> import('@/views/gtk/Gtk.vue'),
        meta: { title: 'Manajemen GTK', requiresAuth: true }
      },
      {
        path: 'alumni',
        alias: '/admin/manajemen-alumni',
        component: ()=> import('@/views/alumni/Alumni.vue'),
        meta: { title: 'Manajemen Alumni', requiresAuth: true }
      },
      {
        path: 'absensi',
        alias: '/admin/absensi/gtk',
        component: ()=> import('@/views/absensi/gtk/AbsensiGTK.vue'),
        meta: { title: 'Absensi GTK', requiresAuth: true }
      },
      {
        path: 'absensi',
        alias: '/admin/absensi/murid',
        component: ()=> import('@/views/absensi/murid/AbsensiMurid.vue'),
        meta: { title: 'Absensi Murid', requiresAuth: true }
      },
      {
        path: 'pelanggaran',
        alias: '/admin/pelanggaran',
        component: ()=> import('@/views/pelanggaran/Pelanggaran.vue'),
        meta: { title: 'Pelanggaran', requiresAuth: true }
      },
      {
        path: 'poin',
        alias: '/admin/poin/pelanggaran',
        component: ()=> import('@/views/poin/Poin.vue'),
        meta: { title: 'Poin Pelanggaran', requiresAuth: true }
      },
      {
        path: 'kategori-pelanggaran',
        alias: '/admin/kategori-pelanggaran',
        component: ()=> import('@/views/kategori_pelanggaran/KategoriPelanggaran.vue'),
        meta: { title: 'Kategori Pelanggaran', requiresAuth: true }
      },
      {
        path: 'bkk',
        alias: '/admin/bkk/list',
        component: ()=> import('@/views/bkk/list/Bkk.vue'),
        meta: { title: 'BKK List', requiresAuth: true }
      },
      {
        path: 'bkk-perusahaan',
        alias: '/admin/bkk/perusahaan',
        component: ()=> import('@/views/bkk/perusahaan/Perusahaan.vue'),
        meta: { title: 'Perusahaan', requiresAuth: true }
      },
      {
        path: 'kelola-sekolah',
        alias: '/admin/setting/sekolah',
        component: ()=> import('@/views/kelola_sekolah/KelolaSekolah.vue'),
        meta: { title: 'Kelola Sekolah', requiresAuth: true }
      },
      {
        path: 'cropper',
        alias: '/admin/cropper',
        component: ()=> import('@/views/cropper/Cropper.vue'),
        meta: { title: 'Test Cropper', requiresAuth: true }
      },
      // ...
    ],
  },
  {
    path: "/admin/*",
    redirect: "/admin/dashboard",
  },
  {
    path: "/login",
    name: 'Login',
    component: ()=> import('@/views/login/Login.vue'),
    meta: { title: 'Login', requiresAuth: false }
  },
  {
    path: "/",
    name: 'Login',
    component: ()=> import('@/views/login/Login.vue'),
    meta: { title: 'Login', requiresAuth: false }
  },  
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
});

router.afterEach((to) => {
  // Cari rute dengan meta.title
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  if (nearestWithTitle) {
    // Gunakan i18n untuk mengambil terjemahan dari kunci di meta.title
    const title = i18n.global.t(nearestWithTitle.meta.title)
    document.title = `${title} | Digitalisasi Sekolah`
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Digitalisasi Sekolah`
  next()
})

router.beforeEach((to, from, next) => {
  const refreshToken = Cookies.get('refreshToken');
  // !!localStorage.getItem('auth'); // Atau cara lain untuk mengecek autentikasi
  if (to.matched.some(record => record.meta.requiresAuth) && !refreshToken) {
    // Jika rute memerlukan autentikasi dan user tidak terautentikasi, redirect ke Login
    next({ name: 'Login' });
  } else if (!to.matched.some(record => record.meta.requiresAuth) && refreshToken) {
    // Jika rute tidak memerlukan autentikasi dan user terautentikasi, redirect ke Dashboard
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router