<script setup>
import SearchPengguna from "./SearchPengguna.vue";
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const emit = defineEmits(['filter'])
const filter = (value) => {
    emit('filter', value)
    console.log(value)
}
</script>


<template>
    <div class="flex items-center justify-end mt-2 md:mt-0 mx-1">
            <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
        >
          Status
          <ChevronDownIcon
            class="-mr-1 ml-2 h-5 w-5 text-white"
            aria-hidden="true"
          />
        </MenuButton>
      </div>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-[-54px] md:right-[-4px] mt-2 w-56 z-50 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ All }">
              <button
                :class="[
                  All       ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
      : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:text-white',
    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
  ]" @click="filter()"
              >
                All Status
              </button>
            </MenuItem>
            <MenuItem v-slot="{ Active }">
              <button
                :class="[
                  Active       ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
      : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:text-white',
    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
  ]" @click="filter('Active')"
              >
                Active
              </button>
            </MenuItem>
            <MenuItem v-slot="{ Inactive }">
              <button
  :class="[
    Inactive
      ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
      : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:text-white',
    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
  ]"
  @click="filter('Inactive')"
>
  Inactive
</button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <!-- <label class="mr-4 items-center ">
        <span class="whitespace-nowrap ml-1 text-sm md:text-base font-semibold">Filter :</span>
    </label> -->
    <!-- <label class="mr-4 items-center justify-center">
        <input type="radio" name="show" value="all" checked @change="filter">
        <span class="whitespace-nowrap ml-1 text-sm md:text-base font-semibold">Show All</span>
    </label>
    <label class="mr-4 items-center justify-center">
        <input type="radio" name="show" value="inActive" @change="filter">
        <span class="whitespace-nowrap ml-1 text-sm md:text-base font-semibold">Inactive</span>
    </label>
    <label class="mr-4 items-center justify-center">
        <input type="radio" name="show" value="active" @change="filter">
        <span class="whitespace-nowrap ml-1 text-sm md:text-base font-semibold">Active</span>
    </label> -->
    </div>
</template>

<script>

</script>