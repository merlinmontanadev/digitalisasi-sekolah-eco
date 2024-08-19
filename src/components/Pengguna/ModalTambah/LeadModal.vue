<script setup>
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

    import {
        defineProps
    } from 'vue';

    const checkDigit = (event) => {
        if (event.key.length === 1 && isNaN(Number(event.key))) {
            event.preventDefault();
        }
    };
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
                                <Form @submit="nextStep" keep-values>
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
                                                    <div class="w-full px-3 sm:w-1/2">
                                                        <div class="mb-2">
                                                            <label for="username" class="block font-semibold pb-2">
                                                                Username<span class="text-red-500">*</span>
                                                            </label>
                                                            <Field :rules="validateUsername" type="text" name="username"
                                                                id="username" placeholder="Masukan Username....."
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
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
                                                            <Field :rules="validateJK" id="jk" name="jk" as="select"
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                                <option value="">Pilih Jenis Kelamin</option>
                                                                <option value="Pria">Pria</option>
                                                                <option value="Wanita">Wanita</option>
                                                            </Field>
                                                            <ErrorMessage
                                                                class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded"
                                                                name="jk" />
                                                        </div>
                                                    </div>
                                                    <div class="w-full px-3">
                                                        <div class="mb-2">
                                                            <label for="jk" class="block font-semibold  pb-2">
                                                                Role
                                                            </label>
                                                            <Field :rules="validateRole" id="role" name="role"
                                                                as="select"
                                                                class="w-full rounded-md block border py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                                <option value="">Pilih Role</option>
                                                                <option value="Admin">Admin</option>
                                                                <option value="User">User</option>
                                                            </Field>
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
                                                                        accept="image/*" name="file"
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
                                                    </div>
                                                    <div class="w-full px-3 sm:1/2">
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
                                    <div class="flex float-right gap-2 mt-2 mb-5">
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
                                    <!-- <pre>{{ values }}</pre> -->
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
        refreshToken
    } from '@/services/refreshToken/refreshToken.js';
    import {
        jwtDecode
    } from "jwt-decode";
    import {
        Cropper
    } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';
    import PersonImage from '@/assets/img/Person.jpg';

    export default {
        components: {
            Cropper,
        },
        data() {
            return {
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
                userFile64: ''
            }
        },
        methods: {
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
                    const whoLogged = await refreshToken();
                    const decodedToken = jwtDecode(whoLogged);
                    if (decodedToken.role !== 'Admin') {
                        console.log('Only admins can add User.');
                        await Swal.fire({
                            icon: "error",
                            title: "Forbidden access!",
                            text: "Only admins can add user,",
                            showConfirmButton: false,
                        })
                        this.fetchUserData();
                        return;
                    }
                    const response = await addUser(data)
                    console.log('Data berhasil diunggah:', data);
                    await Swal.fire({
                        icon: "success",
                        title: "Data berhasil disimpan",
                        showConfirmButton: false,
                        timer: 1500
                    })

                    return response.data; // Mengembalikan respons dari server
                } catch (error) {
                    console.error('Error saat mengunggah data:', error.response.data);
                    await Swal.fire({
                        icon: "error",
                        title: "Data gagal disimpan",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    throw error; // Melempar kembali error untuk ditangani di luar fungsi ini jika perlu
                }
            },
            async nextStep(values) {
                const users = await getAllUsers();
                    const allUsers = users.data.data;
                    const filteredUsers = allUsers.filter(user => user.username === values.username);
                    if (filteredUsers.length === 1){
                        console.log('Username Sudah ada')
                        return
                    }else{
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
                }

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
            async validateUsername(value) {
                const schema = Joi.string().pattern(new RegExp('^[a-z0-9]{3,30}$')).required().messages({
                    'string.pattern.base': 'Username harus terdiri dari huruf kecil dan angka, dengan panjang 3-30 karakter',
                    'any.required': 'Username tidak boleh kosong',
                    'string.empty': 'Username tidak boleh kosong'
                });

                let errorMessage = '';

                const {error} = schema.validate(value);
                if (error) {
                    errorMessage = error.message;
                }
                const users = await getAllUsers(); // Assuming getAllUsers is a method in your component
                const allUsers = users.data.data;
                const filteredUsers = allUsers.filter(user => user.username === value);

                if (filteredUsers.length === 1) {
                    if (errorMessage) {
                        errorMessage += ' dan '; // Combine messages
                    }
                    errorMessage += 'Username sudah ada, silakan pilih username lain';
                }

                // Return the combined error message or true if valid
                return errorMessage || true;
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

                // All is good
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
                    'any.only': 'Jenis Kelamin harus di antara "pria" atau "wanita"'
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