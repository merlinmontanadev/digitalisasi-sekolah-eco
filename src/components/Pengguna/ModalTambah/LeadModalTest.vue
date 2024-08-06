<script setup >
    import {
        PlusIcon,
        UserCircleIcon,
        PhotoIcon,
        XMarkIcon
    } from "@heroicons/vue/24/solid";
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

</script>
<template>
    <TransitionRoot>
        <Dialog @close="closeModal" class="relative z-10 ">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>
            <div class="fixed inset-0 my-6 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-2 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left items-center justify-center  transition-all overflow-y-auto">
                            <DialogTitle
                                class="rounded-t-md px-4 py-2 flex-none gap-2 items-center bg-gradient-to-r from-blue-700 to-blue-500 md:flex ">
                                <div class="text-lg font-bold text-white leading-7 ">Test</div>
                                <div class="text-sm text-white  hidden md:block">-</div>
                                <div class="text-sm text-white ">Test</div>
                                <button @click="closeModal" class="ml-auto">
                                    <div class="h-6 w-6 flex items-center justify-center rounded-full bg-white">
                                        <XMarkIcon class="h-4 w-4 text-blue-600 hover:text-blue-500"></XMarkIcon>
                                    </div>
                                </button>
                            </DialogTitle>
                            <button @click="openModalSecond"
                                class="my-2 hidden text-sm items-center justify-center md:flex bg-gradient-to-r from-blue-700 to-blue-500 font-semibold  text-white px-4 py-2 rounded-full mx-1">
                                <PlusIcon class="mr-2 h-5 w-5 text-white"></PlusIcon> Open Modal Second
                            </button>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
    export default {
        methods: {
        closeModal() {
                this.$emit('close-modal');
        }
        }
    }
</script>