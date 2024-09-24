<template>
    <div class="user-profile container mx-auto p-5">
      <h1 class="text-2xl font-bold text-center mb-5">User Profile</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        <div class="profile-image-column flex justify-center">
          <img :src="user.image" alt="Profile Image" class="profile-image w-32 h-32 rounded-full border-2 border-gray-300" />
        </div>
        <div class="profile-data-column">
          <h2 class="text-xl font-semibold">{{ user.name }}</h2>
          <p class="text-gray-700">Email: {{ user.email }}</p>
          <p class="text-gray-700">About: {{ user.about }}</p>
        </div>
        <div class="profile-settings-column flex justify-center">
          <button @click="editProfile" class="settings-button bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Settings</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          about: 'A passionate developer from Indonesia.',
          image: 'https://via.placeholder.com/150', // Ganti dengan URL gambar profil
        },
      };
    },
    methods: {
      editProfile() {
        alert('Edit profile function is called!');
        // Implementasikan logika untuk mengedit profil
      },
    },
  };
  </script>