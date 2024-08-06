<script setup>
    import {
        PlusIcon
    } from "@heroicons/vue/24/solid";

</script>
<script>
export default {
        data() {
            return {
                isOpenTest: false
            }
        },
        methods: {
            closeModal() {
                this.isOpenTest = false
            },
            openModal() {
                this.$emit('open-modal-test');
            }
        }
    }
</script>
<template>
    <button @click="openModal"
        class="mt-2 hidden text-sm items-center justify-center md:flex bg-gradient-to-r from-blue-700 to-blue-500 font-semibold  text-white px-4 py-2 rounded-full mx-1">
        <PlusIcon class="mr-2 h-5 w-5 text-white"></PlusIcon> Test Modal
    </button>
  <!-- Button + ADD -->
<div class="flex md:hidden fixed bottom-5 right-5 z-10">
    <button @click="openModal"
                class="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                <PlusIcon class="h-6 w-6 inline-block text-white font-bold"></PlusIcon>
    </button>
</div>
</template>