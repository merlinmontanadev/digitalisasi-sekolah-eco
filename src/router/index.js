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

// routes
const routes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: AdminLayout,
    meta: { title: 'Dashboard', requiresAuth: true},
    children: [
      // Tambahkan rute-rute yang terkait dengan dashboard di sini
      {
        path: 'dashboard',
        alias: '/admin/dashboard',
        name: 'Dashboard',
        props: true,
        component: ()=> import('@/views/dashboard/Dashboard.vue'),
        meta: { title: 'Dashboard', requiresAuth: true }
      },    
      {
        path: 'pengguna',
        alias: '/admin/manajemen-pengguna',
        component: ()=> import('@/views/pengguna/Pengguna.vue'),
        meta: { title: 'Manajemen Pengguna', requiresAuth: true },
        props: true
      },
      {
        path: 'pengguna-test',
        alias: '/admin/manajemen-pengguna/test',
        component: ()=> import('@/views/pengguna/TestInputPengguna.vue'),
        meta: { title: 'Test' }
      },
      {
        path: 'image-test',
        alias: '/admin/manajemen-pengguna/show/images',
        component: ()=> import('@/views/pengguna/ImageShow.vue'),
        meta: { title: 'Test' }
      },
      {
        path: 'edit-pengguna',
        alias: '/admin/manajemen-pengguna/edit/user/:user_id',
        component: ()=> import('@/views/pengguna/EditPengguna.vue'),
        props: true,
        meta: { title: 'Manajemen Pengguna', requiresAuth: true }
      },  
      {
        path: 'murid',
        alias: '/admin/manajemen-murid',
        component: ()=> import('@/views/murid/Murid.vue'),
        meta: { title: 'Manajemen Murid', requiresAuth: true }
      },
      {
        path: 'edit-murid',
        alias: '/admin/manajemen-murid/edit/murid/:id_murid',
        component: ()=> import('@/views/murid/EditMurid.vue'),
        props: true,
        meta: { title: 'Manajemen Pengguna', requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Digitalisasi Sekolah`
  next()
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get('auth');
  // !!localStorage.getItem('auth'); // Atau cara lain untuk mengecek autentikasi
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Jika rute memerlukan autentikasi dan user tidak terautentikasi, redirect ke Login
    next({ name: 'Login' });
  } else if (!to.matched.some(record => record.meta.requiresAuth) && isAuthenticated) {
    // Jika rute tidak memerlukan autentikasi dan user terautentikasi, redirect ke Dashboard
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router