<template>
    <div>
      <h1>Image Viewer</h1>
      <img :src="imageUrl" alt="Image" v-if="imageUrl">
      <div v-else>Loading image...</div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      imageUrl: null
    };
  },
  async created() {
    // Panggil API untuk mendapatkan data gambar dalam bentuk Blob
    try {
      const response = await fetch('http://localhost:9000/test/ccd31b0e-dee1-4222-a515-cf5c5093d10f');
      const blob = await response.blob();
      this.imageUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  },
  beforeDestroy() {
    // Hapus URL sementara saat komponen dihancurkan untuk mencegah kebocoran memori
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
};
</script>