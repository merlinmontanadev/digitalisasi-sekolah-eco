<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    '$i18n.locale'(newLocale) {
      // Memperbarui title setiap kali locale berubah
      const nearestWithTitle = this.$route.matched.slice().reverse().find(r => r.meta && r.meta.title);

      if (nearestWithTitle) {
        document.title = `${this.$t(nearestWithTitle.meta.title)} | Digitalisasi Sekolah`;
      }
    }
  },

  mounted() {
    // Set initial title saat komponen dimuat
    const nearestWithTitle = this.$route.matched.slice().reverse().find(r => r.meta && r.meta.title);

    if (nearestWithTitle) {
      document.title = `${this.$t(nearestWithTitle.meta.title)} | Digitalisasi Sekolah`;
    }
  }
}
</script>