<script setup>
    import {
        PlusIcon,
        UserCircleIcon,
        PhotoIcon,
        XMarkIcon,
        MagnifyingGlassIcon,
        ClockIcon,
        ChevronDownIcon
    } from "@heroicons/vue/24/solid";
    import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
    } from '@headlessui/vue'

    import {
        defineProps
    } from 'vue';

    const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]
  const selectedPerson = ref(people[0])

    const checkDigit = (event) => {
    if (event.key && event.key.length === 1 && isNaN(Number(event.key))) {
        event.preventDefault();
    } else {
        return true;
    }
};
</script>
<template>
    <TransitionRoot>
        <Dialog @close="closeModal" class="relative z-10">
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
                            class="w-full z-10 max-w-4xl transform overflow-hidden rounded-md bg-white text-left items-center justify-center  transition-all overflow-y-auto">
                            <DialogTitle
                                class="rounded-t-md px-4 py-2 flex-none gap-2 items-center bg-gradient-to-r from-blue-700 to-blue-500 md:flex ">
                                <div class="text-lg font-bold text-white leading-7 ">Tambah Pengguna</div>
                                <div class="text-sm text-white  hidden md:block">-</div>
                                <div class="text-sm text-white ">Informasi Pengguna</div>
                                <button @click="closeModal" class="ml-auto">
                                    <div class="h-6 w-6 flex items-center justify-center rounded-full bg-white">
                                        <XMarkIcon class="h-4 w-4 text-blue-600 hover:text-blue-500"></XMarkIcon>
                                    </div>
                                </button>
                            </DialogTitle>
                            <div class="px-4">
                                <Form @submit="nextStep" keep-values >
                                    <!-- v-slot="{ values }" -->
                                    <template v-if="currentStep == 0">
                                        <div class="flex items-center justify-center bg-white">
                                            <div class="mx-auto w-full">
                                                <v-stepper model-value="1" style="box-shadow: none; height: auto;"
                                                    class="shadow-none" alt-labels>
                                                    <v-stepper-header style="box-shadow: none;">
                                                        <v-stepper-item title="Informasi Pengguna" value="1"
                                                            class="font-semibold"></v-stepper-item>
                                                        <v-divider></v-divider>

                                                        <v-stepper-item title="Unggah Foto Profil"
                                                            value="2" class="font-semibold"></v-stepper-item>
                                                    </v-stepper-header>
                                                </v-stepper>
                                                <div class="-mx-3 flex flex-wrap">
                                                    <div class="w-full px-3 sm:w-1/2 ">
                                                        <div class="mb-2">
                                                            <label for="username" class="block font-semibold pb-2">
                                                                Username<span class="text-red-500">*</span>
                                                            </label>
                                                            <div class="flex flex-warp gap-2">
                                                            <Field :rules="validateUsername" type="text" name="username"
                                                                id="username" placeholder="Masukan Username....."
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                                <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="username" />
                                                        </div>
                                                    </div>
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-2">
                                                            <label for="email" class="block font-semibold  pb-2">
                                                                Email<span class="text-red-500">*</span>
                                                            </label>
                                                            <Field :rules="validateEmail" type="text" name="email"
                                                                id="email" placeholder="Masukan Email....."
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="email" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="-mx-3 flex flex-wrap">
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-2">
                                                            <label for="nohp" class="block font-semibold  pb-2">
                                                                No HP<span class="text-red-500">*</span>
                                                            </label>
                                                            <Field type="text" name="nohp" id="nohp"
                                                                :rules="validateNoHP" placeholder="62xxxx....."
                                                                @keydown="checkDigit"
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="nohp" />
                                                        </div>
                                                    </div>
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-2">
                                                            <label for="jk" class="block font-semibold  pb-2">
                                                                Jenis Kelamin<span class="text-red-500">*</span>
                                                            </label>
                                                            <div ref="dropdownWrapperJK"  
                                                                @focusout="handleFocusOut"
                                                                tabindex="0">
                                                                <button 
                                                                type="button"
                                                                @click="toggleJK" 
                                                                :class="openjk ? 'ring-blue-600' : ''" 
                                                                class="rounded-md flex w-full items-center justify-between bg-white p-2 border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                                >
                                                                <span>{{ jk === '' ? 'Pilih Jenis Kelamin' : jk }}</span>
                                                                <ChevronDownIcon class="h-4 w-4 text-gray-600 hover:text-gray-500"></ChevronDownIcon>
                                                                </button>
                                                                <ul v-if="openjk" class="z-2 absolute mt-1 w-[47%] rounded bg-white ring-1 ring-gray-300">
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setJK('Pria')"
                                                                >
                                                                    Pria
                                                                </li>
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setJK('Wanita')"
                                                                >
                                                                    Wanita
                                                                </li>
                                                                </ul>
                                                                </div>
                                                                <Field v-model="jk" :rules="validateJK" type="hidden" name="jk" id="jk" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="jk" />
                                                        </div>
                                                    </div>
                                                    <div class="w-full px-3">
                                                        <div class="mb-2">
                                                            <label for="jk" class="block font-semibold  pb-2">
                                                                Role<span class="text-red-500">*</span>
                                                            </label>
                                                            <div ref="dropdownWrapperRole"  
                                                                @focusout="handleFocusOut"
                                                                tabindex="0">
                                                                <button 
                                                                type="button"
                                                                @click="toggleRole" 
                                                                :class="openrole ? 'ring-blue-600' : ''" 
                                                                class="rounded-md flex w-full items-center justify-between bg-white p-2 border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                                >
                                                                <span>{{ role === '' ? 'Pilih Role' : role }}</span>
                                                                <ChevronDownIcon class="h-4 w-4 text-gray-600 hover:text-gray-500"></ChevronDownIcon>
                                                                </button>
                                                                <ul v-if="openrole" class="z-50 absolute mt-1 w-[96%] rounded bg-white ring-1 ring-gray-300">
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setRole('Admin')"
                                                                >
                                                                    Admin
                                                                </li>
                                                                <li 
                                                                    class="sm:text-sm cursor-pointer select-none p-2 hover:bg-blue-200" 
                                                                    @click="setRole('User')"
                                                                >
                                                                    User
                                                                </li>
                                                                </ul>
                                                                </div>
                                                                <div class=" w-72">
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedPerson.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in people"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
                                                            <Field v-model="role" :rules="validateRole" type="hidden" name="role" id="role" />
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="role" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="currentStep == 1">
                                        <div class="flex items-center justify-center bg-white">
                                            <div class="mx-auto w-full">
                                                <v-stepper model-value="1" style="box-shadow: none; height: auto;"
                                                    class="shadow-none mb-5 px-20" alt-labels>
                                                    <v-stepper-header style="box-shadow: none;">
                                                        <v-stepper-item title="Informasi Pengguna" value="0"
                                                            class="font-semibold" complete></v-stepper-item>
                                                        <v-divider></v-divider>
                                                        <v-stepper-item title="Unggah Foto Profil"
                                                            value="2" class="font-semibold"></v-stepper-item>
                                                    </v-stepper-header>
                                                </v-stepper>
                                                <div class="-mx-3 flex flex-wrap">
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-4">
                                                            <label for="cover-photo" class="block font-semibold pb-2">
                                                                Photo Profile
                                                            </label>
                                                            <div class="flex items-center justify-center w-full">
                                                                <img id="uploaded-image"
                                                                    :src="defaultImage" 
                                                                    className="w-64 h-64 mb-2" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-4">
                                                            <div class="flex items-center justify-center w-full mt-8" :class="{'hidden': file}">
                                                                <label for="file-upload"
                                                                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg">
                                                                    <div
                                                                        class="flex flex-col items-center justify-center pt-5 pb-6">
                                                                        <PhotoIcon class="mb-4 h-8 w-8 text-gray-300"
                                                                            aria-hidden="true"
                                                                            :class="{'text-blue-500': file}" />
                                                                        <p class="mb-2 text-sm text-gray-500"
                                                                            v-if="!file">
                                                                            <span class="text-semibold">Click to
                                                                                upload</span>
                                                                        </p>
                                                                        <p class="text-xs text-gray-500" v-if="!file">
                                                                            JPEG, JPG</p>
                                                                    </div>
                                                                    <Field id="file-upload" type="file" class="hidden"
                                                                        accept="image/*" name="file" ref="fileInput"
                                                                        @change="handleFileUpload" />
                                                                </label>
                                                            </div>
                                                            <cropper ref="cropper" id="cropper" class="h-64 w-64 mx-auto mt-8" v-if="file" 
                                                                :src="userFiles"
                                                                @change="change" 
                                                                :aspectRatio="aspectRatio" 
                                                                :resizeImage="false"
                                                                :restrictPosition="true" 
                                                                :stencil-props="{
                                                                aspectRatio: 1,
                                                                movable: true,
                                                                resizable: false  
                                                                }" />
                                                        </div>
                                                        <div class="mx-20">
                                                        <button
                        class="w-full mr-10 bg-gradient-to-r from-blue-700 to-blue-500 font-semibold rounded text-white select-none"
                        type="button" v-if="file" @click="triggerFileInput">Ganti Foto</button>
                                                        </div>
                                                    </div>
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-4">
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="file" />
                                                        </div>
                                                    </div>
                                                    <!-- here -->
                                                    <!-- Disini saya ingin menambahkan modal untuk crop dengan TransitionRoot dari headlessui -->
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="flex float-right gap-2 mt-5 mb-5">
                                        <v-btn
                                            class="hover:shadow-form rounded-full border hover:bg-gray-50 border-blue-700 px-4 py-2 text-center font-base text-sm text-black outline-none"
                                            v-if="currentStep !== 0" type="button" @click="prevStep">
                                            Previous
                                        </v-btn>
                                        <v-btn
                                            class="hover:shadow-form rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none"
                                            v-if="currentStep !== 1" type="submit">Next</v-btn>
                                        <v-btn
                                            class="hover:shadow-form rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none"
                                            v-if="currentStep === 1" type="submit">Submit</v-btn>
                                    </div>
                                    <!-- <pre>
                                                        {{ values }}
                                                    </pre> -->
                                </Form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
    import {
        Form,
        Field,
        ErrorMessage
    } from 'vee-validate';
    import Joi from 'joi';
    import {
        ref
    } from 'vue';
    import Swal from 'sweetalert2';
    import {
        getAllUsers, addUser
    } from '@/services/pengguna/Pengguna.js';
    import {
        jwtDecode
    } from "jwt-decode";
    import {
        Cropper
    } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';
    import PersonImage from '@/assets/img/Person.jpg';
    import { useToast } from "vue-toastification";

    export default {
        components: {
            Cropper,
        },
        data() {
            return {
                toast: useToast(),
                currentStep: 0,
                file: null,
                // Inisialisasi objek formData untuk menyimpan data form
                username: '',
                email: '',
                nohp: '',
                jk: '',
                role: '',
                defaultImage: PersonImage,
                userFiles: '',
                userFile64: '',
                openjk: false,
                openrole: false,
                // loadingUsername: false,
            }
        },
        setup() {
        const toast = useToast();
        return { toast }
        },
        methods: {
            toggleJK() {
      this.openjk = !this.openjk;
    },
    toggleRole() {
      this.openrole = !this.openrole;
    },
    setJK(jk) {
      this.jk = jk;
      this.openjk = false;
    },
    setRole(role){
        this.role = role
        this.openrole = false
    },
    handleFocusOut(event) {
      if (!this.$refs.dropdownWrapperJK.contains(event.relatedTarget)) {
        this.openjk = false;  // Close dropdown if focus leaves the dropdown
      }

      if (!this.$refs.dropdownWrapperRole.contains(event.relatedTarget)) {
        this.openrole = false;  // Close dropdown if focus leaves the dropdown
      }
    },
            // async checkUsername(){
            //     if (!this.username){
            //         this.toast.error("Username Tidak Boleh Kosong");
            //         this.username = ""
            //         this.loadingUsername = false;
            //         return true
            //     }
            //     this.loadingUsername = true;
            //     this.toast.info("Mohon Tunggu Sebentar...");
            //     try {
            //         const users = await getAllUsers();
            //         const allUsers = users.data.data;
            //         const filteredUsers = allUsers.filter(user => user.username === this.username);
            //         if (filteredUsers.length === 1) {
            //             this.toast.error("Username Tidak Dapat Digunakan");
            //             this.username = ""
            //         }else{
            //             this.toast.info("Username Dapat Digunakan");
            //         }

            //         this.loadingUsername = false;
            //     } catch (error) {
            //         this.toast.error("Error Check Username");
            //         this.username = ""
            //         this.loadingUsername = false;
            //     } finally {
            //         this.loadingUsername = false;  // Reset loading state
            //     }
            // },
            change({coordinates,canvas}) {
                const hoi = canvas.toDataURL();
                this.defaultImage = hoi
                this.userFile64 = hoi
                console.log(this.userFile64)
            },
            handleFileUpload(event) {
                const file = event.target.files[0];
                this.file = file; // Simpan file untuk digunakan saat upload
                if (this.file) {
                this.userFiles = URL.createObjectURL(this.file); // Menampilkan gambar yang dipilih saat modal dibuka
                } else {
                // Handle case where no file is selected
                alert("Please select a file first");
                }
            },
            triggerFileInput() {
        // Panggil metode click pada elemen input file
        this.$refs.fileInput.$el.click();
      },
            DataURIToBlob(dataURL) {
                const splitDataURI = dataURL.split(',')
                const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
                const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

                const ia = new Uint8Array(byteString.length)
                for (let i = 0; i < byteString.length; i++)
                ia[i] = byteString.charCodeAt(i)

                return new Blob([ia], {
                type: mimeString
                })
            },
            async handlerSimpan(data) {
                try {
                    const whoLogged = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('refreshToken='))
                    ?.split('=')[1];
                    const decodedToken = jwtDecode(whoLogged);
                    if (decodedToken.role !== 'Admin') {
                        this.toast.info("Only admins can add User.");
                        console.log('Only admins can add User.');
                        await Swal.fire({
                            icon: "error",
                            title: "Forbidden access!",
                            text: "Only admins can add user,",
                            showConfirmButton: false,
                        })
                        return;
                    }
                    const response = await addUser(data);
                    this.toast.success("Data berhasil disimpan");
                    await Swal.fire({
                    icon: "success",
                    title: "Data berhasil disimpan",
                    showConfirmButton: false,
                    })
                    return response.data; // Mengembalikan respons dari server
                } catch (error) {
                    const tittle = error.response.data.message
                    console.error('Error saat mengunggah data:', tittle);    
                    this.toast.error(tittle);
                    await Swal.fire({
                    icon: "error",
                    title: tittle,
                    showConfirmButton: false,
                    })
                    throw error; // Melempar kembali error untuk ditangani di luar fungsi ini jika perlu
                }
            },
            nextStep(values) {
                if (this.currentStep === 1) {
                        const formData = new FormData();
                        formData.append('username', values.username);
                        formData.append('email', values.email);
                        formData.append('nohp', values.nohp);
                        formData.append('jk', values.jk);
                        formData.append('role', values.role);
                        const file = this.DataURIToBlob(this.userFile64);
                        formData.append('file', file);
                        this.handlerSimpan(formData);
                        this.closeModal();
                        return;
                    }
                    this.currentStep++;
            },
            async fetchUserData() {
             await getAllUsers();
            },
            prevStep() {
                if (this.currentStep <= 0) {
                    return;
                }
                this.currentStep--;
            },
            validateUsername(value) {
                const schema = Joi.string().pattern(new RegExp('^[a-z0-9]{3,30}$')).required().messages({
                    'string.pattern.base': 'Username harus terdiri dari huruf kecil dan angka, dengan panjang 3-30 karakter',
                    'any.required': 'Username tidak boleh kosong',
                    'string.empty': 'Username tidak boleh kosong'
                });

                const {
                    error
                } = schema.validate(value);
                if (error) {
                    return error.message;
                }
                return true;
            },
            validateEmail(value) {
                const schema = Joi.string().email({
                    minDomainSegments: 1,
                    tlds: {
                        allow: ['com']
                    }
                }).required().messages({
                    'string.email': 'Email harus valid',
                    'any.required': 'Email tidak boleh kosong',
                    'string.empty': 'Email tidak boleh kosong'
                });
                const {
                    error
                } = schema.validate(value);
                if (error) {
                    return error.message;
                }
                return true;
            },
            validateNoHP(value) {
                const schema = Joi.string().pattern(new RegExp('^[0-9]*$')).min(10).max(13).required().messages({
                    'string.pattern.base': 'Nomor HP harus terdiri dari angka, dengan panjang 10-13 karakter',
                    'any.required': 'Nomor HP tidak boleh kosong',
                    'string.empty': 'Nomor HP tidak boleh kosong',
                    'string.min': `"No HP" should have a minimum length of {#limit}`,
                    'string.max': `"No HP" should have a maximum length of {#limit}`
                })
                const {
                    error
                } = schema.validate(value);
                if (error) {
                    return error.message;
                }
                return true;
            },
            validateJK(value) {
                const schema = Joi.string().valid('Pria', 'Wanita').required().messages({
                    'any.required': 'Jenis Kelamin tidak boleh kosong',
                    'string.empty': 'Jenis Kelamin tidak boleh kosong',
                    'any.only': 'Jenis Kelamin harus di antara "Pria" atau "Wanita"'
                });
                const {
                    error
                } = schema.validate(value);
                if (error) {
                    return error.message;
                }
                return true;
            },
            validateImage(value) {
                const schema = Joi.string()
                const {
                    error
                } = schema.validate(value);
                if (error) {
                    return error.message;
                }
                return true;
            },
            validateRole(value) {
                const schema = Joi.string().valid('Admin', 'User').required().messages({
                    'any.required': 'Role tidak boleh kosong',
                    'string.empty': 'Role tidak boleh kosong',
                    'any.only': 'Role harus di antara "Admin" atau "User"'
                });
                const {
                    error
                } = schema.validate(value);

                if (error) {
                    return error.message;
                }
                return true;
            },
            closeModal() {
                this.prevStep();
                this.$emit('close-modal');
                this.userFile64 = ''
                this.file = null
                this.jk = ''
                this.openjk = false
                this.role = ''
                this.openrole = false
            }
        }
    }
</script>
<style>
    .DialogPanel {
        /* Existing styles... */
        overflow-y: auto;
    }

    .v-stepper-item--selected .v-stepper-item__avatar.v-avatar,
    .v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
        background-color: rgb(70, 172, 64);
        border-color: rgb(70, 172, 64);
    }

    .step-border>.v-stepper__content {
        border-left: 1px solid rgba(0, 0, 0, 0.12);
    }

    .v-divider {
        opacity: 5;
    }

    .cropper {
        height: 600px;
        background: #DDD;
    }
</style>