<template>
    <div class="flex py-2">
        <div class="relative w-full flex items-center text-gray-400 focus-within:text-gray-600">
          <MagnifyingGlassIcon class="w-5 h-5 absolute ml-3 pointer-events-none"/>
          <input
            type="text"
            name="search"
            placeholder="Search NIS, Nama Murid..."
            autocomplete="off"
            aria-label="Search talk"
            class="w-full md:w-72 text-sm pr-3 pl-10 px-4 py-2  placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 "
            @input="search"
            >
        </div>
    </div>
  </template>
   
  <script setup>
  import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue';
  import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

    const emit = defineEmits(['search'])
    const search = (e) => {
    emit('search', e.target.value)
    }
  </script>