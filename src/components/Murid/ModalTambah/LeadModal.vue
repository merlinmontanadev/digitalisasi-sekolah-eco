<script setup>
    import {
        PlusIcon,
        UserCircleIcon,
        PhotoIcon,
        XMarkIcon,
        DocumentIcon
    } from "@heroicons/vue/24/solid";
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    import { ref } from 'vue';
</script>
<template>
    <TransitionRoot>
        <Dialog @close="closeModal" class="relative z-10 ">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>
            <div class="fixed inset-0 my-6 overflow-y-auto">
                <div class="flex h-full items-center justify-center p-2 ">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-sm bg-white transition-all overflow-y-auto">
                            <DialogTitle
                                class="rounded-t-sm px-4 py-2 flex-none gap-2 items-center bg-gradient-to-r from-blue-700 to-blue-500 md:flex ">
                                <div class="text-lg font-bold text-white leading-7 ">Tambah Murid</div>
                                <div class="text-sm text-white  hidden md:block">-</div>
                                <div class="text-sm text-white ">Data Murid</div>
                                <button @click="closeModal" class="ml-auto">
                                    <div class="h-6 w-6 flex items-center justify-center rounded-full bg-white">
                                        <XMarkIcon class="h-4 w-4 text-blue-600 hover:text-blue-500"></XMarkIcon>
                                    </div>
                                </button>
                            </DialogTitle>
                            <div class="px-4">
                                <Form 
                                @submit="nextStep"
                                keep-values
                                >
                                <!-- v-slot="{ values }" -->
                                <template v-if="currentStep == 0">
                                    <div class="flex items-center justify-center bg-white">
                                        <div class="mx-auto w-full">
                                            <v-stepper model-value="1" style="box-shadow: none; height: auto;"
                                                class="shadow-none " alt-labels>
                                                <v-stepper-header style="box-shadow: none;">
                                                    <v-stepper-item title="Informasi Pribadi" value="1"
                                                        class="font-semibold"></v-stepper-item>
                                                        <v-stepper-item hidden value="2"
                                                        class="font-semibold"></v-stepper-item>
                                                    <v-divider></v-divider>
                                                    <v-stepper-item title="Informasi Pendidikan" value="2"></v-stepper-item>
                                                </v-stepper-header>
                                            </v-stepper>
                                            <div class="-mx-3 flex flex-wrap">
                                                <div class="w-full px-3 ">
                                                    <div class="mb-1">
                                                        <label for="nik" class="block font-semibold pb-2">
                                                            NIK<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field 
                                                        :rules="validateNik"
                                                        type="string" 
                                                        name="nik" 
                                                        id="nik"
                                                        @input="preventNumber"
                                                        placeholder="Masukan NIK....."
                                                        class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                        <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="nik" />
                                                        </div>
                                                </div>
                                            </div>
                                            <div class="-mx-3 flex flex-wrap">
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="namalengkap" class="block font-semibold pb-2">
                                                            Nama Lengkap<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="nama_lengkap" id="namalengkap"
                                                            :rules="validateNamaLengkap"
                                                            placeholder="Masukan Nama Lengkap....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="nama_lengkap" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="tempatlahir" class="block font-semibold pb-2">
                                                            Tempat Lahir<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="tempat_lahir" id="tempatlahir"
                                                            :rules="validateTempatLahir"
                                                            placeholder="Masukan Tempat Lahir....."
                                                            class="w-full rounded-sm block  py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="tempat_lahir" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="tanggallahir" class="block font-semibold pb-2">
                                                            Tanggal Lahir<span class="text-red-500">*</span>
                                                        </label>
                                                        <VueDatePicker v-model="date" @change="onDateChange" placeholder="Masukan Tanggal Lahir....." :enable-time-picker="false" :format="format" :teleport="true"></VueDatePicker>
                                                        <Field v-model="formattedDate" type="date" name="tanggal_lahir" id="tanggal_lahir"
                                                            :rules="validateTanggalLahir" hidden/>
                                                        <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="tanggal_lahir" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3">
                                                    <div class="mb-2 mt-2">
                                                        <label for="jk" class="block font-semibold pb-2">
                                                            Jenis Kelamin<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field 
                                                        :rules="validateJK" 
                                                        id="jk" name="jenis_kelamin" as="select" class="w-full rounded-sm block py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                        <option value="">Pilih Jenis Kelamin</option>
                                                        <option value="Pria">Pria</option>
                                                        <option value="Wanita">Wanita</option>
                                                        </Field>
                                                        <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="jenis_kelamin" />
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
                                                class="shadow-none " alt-labels>
                                                <v-stepper-header style="box-shadow: none;">
                                                    <v-stepper-item title="Informasi Pribadi" value="1" class="font-semibold"></v-stepper-item>
                                                    <v-stepper-item hidden value="2" class="font-semibold"></v-stepper-item>
                                                        <v-divider></v-divider>
                                                    <v-stepper-item title="Informasi Pendidikan" value="2"></v-stepper-item>
                                                </v-stepper-header>
                                            </v-stepper>
                                            <div class="-mx-3 flex flex-wrap">
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="alamat" class="block font-semibold pb-2">
                                                            Alamat<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="alamat" id="alamat"
                                                            :rules="validateAlamat"
                                                            placeholder="Masukan Alamat....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="alamat" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="provinsi" class="block font-semibold pb-2">
                                                            Provinsi<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="prov" id="provinsi" as="select" :rules="validateProvinsi" v-model="selectedProvinsi" @change="handleProvinsiChange" class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" >
                                                            <option value="">Pilih Provinsi</option>
                                                            <option v-for="prov in provinsiList" :key="prov.id" :value="prov.id">{{ prov.name }}</option>
                                                        </Field>
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="prov" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="kabupaten" class="block font-semibold pb-2">
                                                            Kabupaten<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="kab" id="kabupaten" as="select" :rules="validateKabupaten" v-model="selectedKabupaten" :disabled="!selectedProvinsi" @change="handleKabupatenChange"
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                            <option value="">Pilih Kabupaten</option>
                                                            <option v-for="kab in kabupatenList" :key="kab.id" :value="kab.id">{{ kab.name }}</option>
                                                            </Field>
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="kab" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="kecamatan" class="block font-semibold pb-2">
                                                            Kecamatan<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="kec" id="kecamatan" as="select" :rules="validateKecamatan" v-model="selectedKecamatan" :disabled="!selectedKabupaten" @change="handleKecamatanChange"
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                            <option value="">Pilih Kecamatan</option>
                                                            <option v-for="kec in kecamatanList" :key="kec.id" :value="kec.id">{{ kec.name }}</option>
                                                            </Field>
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="kec" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="desakel" class="block font-semibold pb-2">
                                                            Desa/Kelurahan<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="kel_des" id="desakel" as="select" :rules="validateDesa" v-model="selectedDesa" :disabled="!selectedKecamatan"
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                            <option value="">Pilih Desa/Kelurahan</option>
                                                            <option v-for="des in desaList" :key="des.id" :value="des.id">{{ des.name }}</option>
                                                            </Field>
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="kel_des" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="agama" class="block font-semibold pb-2">
                                                            Agama<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field 
                                                        :rules="validateAgama" 
                                                        id="agama" name="agama" as="select" class="w-full rounded-sm block py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                        <option value="">Pilih Agama</option>
                                                        <option value="Islam">Islam</option>
                                                        <option value="Kristen">Kristen</option>
                                                        <option value="Katolik">Katolik</option>
                                                        <option value="Hindu">Hindu</option>
                                                        <option value="Buddha">Buddha</option>
                                                        <option value="Khonghucu">Khonghucu</option>
                                                        </Field>
                                                        <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="agama" />
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="currentStep == 2">
                                    <div class="flex items-center justify-center bg-white">
                                        <div class="mx-auto w-full">
                                            <v-stepper model-value="1" style="box-shadow: none; height: auto;"
                                                class="shadow-none " alt-labels>
                                                <v-stepper-header style="box-shadow: none;">
                                                    <v-stepper-item title="Informasi Pribadi" value="1"
                                                        class="font-semibold"></v-stepper-item>
                                                        <v-stepper-item hidden value="5"
                                                        class="font-semibold"></v-stepper-item>
                                                        <v-stepper-item hidden value="4"
                                                        class="font-semibold"></v-stepper-item>
                                                    <v-divider></v-divider>
                                                    <v-stepper-item title="Informasi Pendidikan" value="2"></v-stepper-item>
                                                </v-stepper-header>
                                            </v-stepper>
                                            <div class="-mx-3 flex flex-wrap">
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="telepon" class="block font-semibold pb-2">
                                                            No. Telepon<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="telepon" id="telepon"
                                                            :rules="validateTelepon"
                                                            placeholder="Masukan Nomor Telepon....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="telepon" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="hp" class="block font-semibold pb-2">
                                                            No. Hp<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="hp" id="hp"
                                                            :rules="validateHp"
                                                            placeholder="Masukan No. Hp....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="hp" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="email" class="block font-semibold pb-2">
                                                            Email<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="email" name="email" id="email"
                                                            :rules="validateEmail"
                                                            placeholder="Masukan Alamat Email....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="email" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 flex">
                                                    <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="cover-photo" class="block font-semibold pb-2">
                                                            Photo Profile<span class="text-red-500">*</span>
                                                        </label>
                                                        <div class="flex items-center justify-center w-full">
                                                            <img id="uploaded-image" :src="defaultImage"  className="w-64 h-64 mb-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-4">
                                                        <div class="flex items-center justify-center w-full mt-8" :class="{'hidden': file}">
                                                            <label for="file-upload" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg">
                                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <PhotoIcon class="mb-4 h-8 w-8 text-gray-300"
                                                                    aria-hidden="true" :class="{'text-blue-500': file}"/>
                                                                    <p class="mb-2 text-sm text-gray-500" v-if="!file">
                                                                        <span class="text-semibold">Click to upload</span>
                                                                    </p>
                                                                    <p class="text-xs text-gray-500" v-if="!file">JPEG, JPG</p>
                                                                </div>
                                                                <Field id="file-upload" type="file" class="hidden" accept="image/*" name="file" @change="handleFileUpload" :rules="validateFile"/>
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
                                                
                                                </div>
                                                <ErrorMessage class="mx-3 flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="file" />
                                                
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="currentStep == 3">
                                    <div class="flex items-center justify-center bg-white">
                                        <div class="mx-auto w-full">
                                            <v-stepper model-value="2" style="box-shadow: none; height: auto;"
                                                class="shadow-none " alt-labels>
                                                <v-stepper-header style="box-shadow: none;">
                                                    <v-stepper-item title="Informasi Pribadi" value="1"
                                                        class="font-semibold"></v-stepper-item>
                                                        <v-stepper-item hidden value="5"
                                                        class="font-semibold"></v-stepper-item>
                                                        <v-stepper-item hidden value="4"
                                                        class="font-semibold"></v-stepper-item>
                                                    <v-divider></v-divider>
                                                    <v-stepper-item title="Informasi Pendidikan" value="2"></v-stepper-item>
                                                </v-stepper-header>
                                            </v-stepper>
                                            <div class="-mx-3 flex flex-wrap">
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="nis" class="block font-semibold pb-2">
                                                            NIS<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="nis" id="nis"
                                                            :rules="validateNis"
                                                            placeholder="Masukan NIS....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="nis" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="nisn" class="block font-semibold pb-2">
                                                            NISN<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="nisn" id="nisn"
                                                            :rules="validateNisn"
                                                            placeholder="Masukan NISN....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="nisn" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="asal_sekolah" class="block font-semibold pb-2">
                                                            Asal Sekolah<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="asal_sekolah" id="asal_sekolah"
                                                            :rules="validateAsalSekolah"
                                                            placeholder="Masukan Asal Sekolah....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="asal_sekolah" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="t_masuk" class="block font-semibold pb-2">
                                                            Tahun Masuk<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="t_masuk" id="t_masuk"
                                                            :rules="validateTahunMasuk"
                                                            placeholder="Masukan Tahun Masuk....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="t_masuk" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3">
                                                    <div class="mb-1 mt-2">
                                                        <label for="t_lulus" class="block font-semibold pb-2">
                                                            Tahun Lulus<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="t_lulus" id="t_lulus"
                                                            :rules="validateTahunLulus"
                                                            placeholder="Masukan Tahun Lulus....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="asal_sekolah" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label for="t_smp" class="block font-semibold pb-2">
                                                           Transkrip Nilai SMP<span class="text-red-500">*</span>
                                                        </label>
                                                        <Field type="text" name="t_smp" id="t_smp"
                                                            :rules="validateTranskriphSMP"
                                                            placeholder="Masukan Transkrip Nilai SMP....."
                                                            class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="t_smp" />
                                                        </div>
                                                </div>
                                                <div class="w-full px-3 sm:w-1/2">
                                                    <div class="mb-1 mt-2">
                                                        <label class="block font-semibold pb-2">
                                                            Ijazah SMP<span class="text-red-500">*</span>
                                                        </label>
                                                        <div class="flex w- full rounded-sm py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 items-center mb-1">
                                                            <DocumentIcon class="h-8 w-8 mr-2 text-blue-700"
                                                                    aria-hidden="true"/>
                                                                    <p class="text-sm text-gray-500 text-center" >
                                                                        <span class="text-semibold">{{ selectedFileName || "Upload Ijazah Disini" }}</span>
                                                                    </p>
                                                        </div>
                                                        <button @click="triggerFileUpload" type="button" class="w-full hover:shadow-form rounded bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none">Upload Ijazah</button>
                                                        <input 
                                                            type="file" 
                                                            ref="ijazahField" 
                                                            accept=".pdf"
                                                            @change="handleFileChange"
                                                            style="display: none;"
                                                        />
                                                        <Field name="i_smp" v-slot="{ field }">
                                                            <div>
                                                            <input 
                                                            style="display: none;"
                                                                v-bind="field"
                                                                :value="ijazahFile ? ijazahFile.name : ''" 
                                                            />
                                                            </div>
                                                        </Field>
                                                            <ErrorMessage class="flex text-red-500 text-sm bg-red-200 w-full h-full p-2 mt-2 rounded" name="i_smp" />
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div class="flex float-right gap-2 mt-2 mb-5">
                                    <v-btn class="hover:shadow-form rounded-full border hover:bg-gray-50 border-blue-700 px-4 py-2 text-center font-base text-sm text-black outline-none" v-if="currentStep !== 0" type="button" @click="prevStep">
                                        Previous
                                    </v-btn>
                                    <v-btn class="hover:shadow-form rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none" v-if="currentStep !== 3" type="submit">Next</v-btn>

                                    <v-btn class="hover:shadow-form rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-center font-semibold text-sm text-white outline-none" v-if="currentStep === 3" type="submit">Submit</v-btn>
                                </div>
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import Joi from 'joi';
import Swal from 'sweetalert2';
import { getAllMurids, simpanMurid } from '@/services/murid/Murid.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import PersonImage from '@/assets/img/Person.jpg';
import {
        Cropper
    } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';

    export default {
        components: { Field, ErrorMessage, VueDatePicker },
        data() {
            return {
            userFiles: '',
            userFile64: '',
            defaultImage: PersonImage,
            provinsiList: [],
            selectedProvinsi: "",
            kabupatenList: [],
            selectedKabupaten: "",
            kecamatanList: [],
            selectedKecamatan: "",
            desaList: [],
            selectedDesa: "",
            currentStep: 0,
            file: null,
            uploadedImageUrl: '',
            // Inisialisasi objek formData untuk menyimpan data form
            nik: '',
            nama_lengkap: '',
            tempat_lahir: '',
            jenis_kelamin: '',
            alamat: '',
            prov: '',
            kab: '',
            kec: '',
            kel_des: '',
            agama: '',
            telepon: '',
            hp: '',
            email: '',
            nisn: '',
            nis: '',
            asal_sekolah: '',
            t_masuk: '',
            t_lulus: '',
            t_smp: '',
            i_smp: '',
            date: '',
            ijazahFile: null,
            }
        },
        computed: {
            formattedDate() {
                if (this.date) {
                    return this.format(new Date(this.date));
                }
                return this.date = '';
            },
        },
        created() {
            this.fetchProvinsi();
        },
        methods: {
        onDateChange(event) {
            this.date = event.target.value;
        },
        fetchProvinsi() {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            .then(response => response.json())
            .then(provinces => {this.provinsiList = provinces;})
        },
        fetchKabupaten(){
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.selectedProvinsi}.json`)
            .then(response => response.json())
            .then(regencies => {this.kabupatenList = regencies;})
        },
        fetchKecamatan(){
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.selectedKabupaten}.json`)
            .then(response => response.json())
            .then(districts => {this.kecamatanList = districts;})
        },
        fetchDesa(){
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.selectedKecamatan}.json`)
            .then(response => response.json())
            .then(villages => {this.desaList = villages;})
        },
        handleProvinsiChange() {
            this.selectedKabupaten = "";
            this.selectedKecamatan = "";
            this.selectedDesa = "";
            this.kabupatenList = [];
            this.kecamatanList = [];
            this.desaList = [];
            this.fetchKabupaten();
        },
        handleKabupatenChange() {
            this.selectedKecamatan = "";
            this.selectedDesa = "";
            this.kecamatanList = [];
            this.desaList = [];
            this.fetchKecamatan();
        },
        handleKecamatanChange() {
            this.selectedDesa = "";
            this.desaList = [];
            this.fetchDesa();
        },
        format(date) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${year}-${month}-${day}`;
        },
        resetImage() {
        this.imageSrc = '@assets/img/Person.jpg';
        this.file = null;
        // Optionally, reset the file input field
        document.getElementById('file-upload').value = null;
        },
        triggerFileUpload() {
        if (this.$refs.ijazahField) {
            this.$refs.ijazahField.click();
        } else {
            console.error("Ref ijazahField tidak ditemukan");
        }
        },
        handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.ijazahFile = file;
        console.log("File yang dipilih:", file.name);
      } else {
        this.ijazahFile = null;
        console.error("Silakan pilih file PDF.");
      }
    },
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
                    const response = await simpanMurid(data);
                    console.log('Data berhasil diunggah:', data);
                    await Swal.fire({
                    icon: "success",
                    title: "Data berhasil disimpan",
                    showConfirmButton: false,
                    timer: 1500
                    })
                    return response.data; // Mengembalikan respons dari server
                } catch (error) {
                    if (error.response.status === 400) {
            // Menampilkan pesan error jika ada kesalahan pada form
            await Swal.fire({
                icon: "error",
                title: "Kesalahan pada form",
                text: error.response.data.message, // Pesan kesalahan dari server
                showConfirmButton: true
            });
        } else {
            // Menampilkan pesan error jika terjadi kesalahan dari server
            await Swal.fire({
                icon: "error",
                title: "Data gagal disimpan",
                text: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
                showConfirmButton: false,
                timer: 1500
            });
        }; // Melempar kembali error untuk ditangani di luar fungsi ini jika perlu
                }
            },
        nextStep(values) {
            if (this.currentStep === 3) {
                const updatedValues = { ...this.values, i_smp: this.ijazahFile };
                const formData = new FormData();
                formData.append('nik_murid', values.nik);
                formData.append('nama_lengkap', values.nama_lengkap);
                formData.append('nis', values.nis);
                formData.append('nisn', values.nisn);
                formData.append('tempat_lahir', values.tempat_lahir);
                formData.append('jenis_kelamin', values.jenis_kelamin);
                formData.append('tanggal_lahir', values.tanggal_lahir);
                formData.append('alamat', values.alamat);
                formData.append('prov', values.prov);
                formData.append('kab', values.kab);
                formData.append('kec', values.kec);
                formData.append('kel_des', values.kel_des);
                formData.append('agama', values.agama);
                formData.append('telepon', values.telepon);
                formData.append('hp', values.hp);
                formData.append('email', values.email);
                formData.append('asal_sekolah', values.asal_sekolah);
                formData.append('t_masuk', values.t_masuk);
                formData.append('t_lulus', values.t_lulus);
                formData.append('t_smp', values.t_smp);
                formData.append('i_smp', updatedValues);
                const file = this.DataURIToBlob(this.userFile64);
                formData.append('file', file);
                // console.log(formData)
                this.handlerSimpan(formData);
                this.closeModal();
                this.fetchMuridData();
                return;
            }
            this.currentStep++;
        },
        async fetchMuridData() {
                const murid = await getAllMurids();
                this.muridData = murid;
                this.isLoading = false;
                if (!murid) {
                this.isNotFound = true;
            }
        },
        prevStep() {
            if (this.currentStep <= 0) {
                return;
            }
            this.currentStep--;
        },
        validateTelepon(value) {
            const schema = Joi.string().pattern(new RegExp('^[0-9]*$')).min(10).max(13).required().messages({
            'string.pattern.base': 'Nomor Telepon harus terdiri dari angka, dengan panjang 10-13 karakter',
            'any.required': 'Nomor Telepon tidak boleh kosong',
            'string.empty': 'Nomor Telepon tidak boleh kosong',
            'string.min': `"No Telepon" should have a minimum length of {#limit}`,
            'string.max': `"No Telepon" should have a maximum length of {#limit}`
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateHp(value) {
            const schema = Joi.string().pattern(new RegExp('^[0-9]*$')).min(10).max(13).required().messages({
            'string.pattern.base': 'Nomor HP harus terdiri dari angka, dengan panjang 10-13 karakter',
            'any.required': 'Nomor HP tidak boleh kosong',
            'string.empty': 'Nomor HP tidak boleh kosong',
            'string.min': `"No HP" should have a minimum length of {#limit}`,
            'string.max': `"No HP" should have a maximum length of {#limit}`
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateEmail(value) {
            const schema = Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).required().messages({
            'string.email': 'Email harus valid',
            'any.required': 'Email tidak boleh kosong',
            'string.empty': 'Email tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
            },
        validateNik(value) {
            const schema = Joi.string().required().messages({
                'any.required': 'NIK tidak boleh kosong',
                'string.empty': 'NIK tidak boleh kosong',
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
        },
        validateFile(value) {
            const schema = Joi.required().messages({
            'any.required': 'File tidak boleh kosong',
            'string.empty': 'File tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
        },
        validateNamaLengkap(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Nama Lengkap tidak boleh kosong',
            'string.empty': 'Nama Lengkap tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
        },
        validateProvinsi(value) {
            const schema = Joi.string().required().messages({
                'any.required': 'Provinsi tidak boleh kosong',
                'string.empty': 'Provinsi tidak boleh kosong',
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateKabupaten(value) {
            const schema = Joi.string().required().messages({
                'any.required': 'Kabupaten tidak boleh kosong',
                'string.empty': 'Kabupaten tidak boleh kosong',
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateKecamatan(value) {
            const schema = Joi.string().required().messages({
                'any.required': 'Kecamatan tidak boleh kosong',
                'string.empty': 'Kecamatan tidak boleh kosong',
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateDesa(value) {
            const schema = Joi.string().required().messages({
                'any.required': 'Desa/Kelurahan tidak boleh kosong',
                'string.empty': 'Desa/Kelurahan tidak boleh kosong',
            });
            const { error } = schema.validate(value);
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
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateTempatLahir(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Tempat Lahir tidak boleh kosong',
            'string.empty': 'Tempat Lahir tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
        },
        validateTanggalLahir(value) {
            const schema = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
            'any.required': 'Tanggal Lahir tidak boleh kosong',
            'string.empty': 'Tanggal Lahir tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
        },
        validateAlamat(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,30}$')).required().messages({
            'any.required': 'Alamat tidak boleh kosong',
            'string.empty': 'Alamat tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateDesKel(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Desa/Kelurahan tidak boleh kosong',
            'string.empty': 'Desa/Kelurahan tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateKec(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Kecamatan tidak boleh kosong',
            'string.empty': 'Kecamatan tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateKab(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Kabupaten tidak boleh kosong',
            'string.empty': 'Kabupaten tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateJenisTinggal(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Jenis Tinggal tidak boleh kosong',
            'string.empty': 'Jenis Tinggal tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateAlatTrans(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required().messages({
            'any.required': 'Alat Transportasi tidak boleh kosong',
            'string.empty': 'Alat Transportasi tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateImage(value) {
            const schema = Joi.string()
            const { error } = schema.validate(value);
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
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateTelepon(value) {
            const schema = Joi.string().pattern(new RegExp('^[0-9]*$')).min(10).max(13).required().messages({
            'string.pattern.base': 'Telepon harus terdiri dari angka, dengan panjang 10-13 karakter',
            'any.required': 'Telepon tidak boleh kosong',
            'string.empty': 'Telepon tidak boleh kosong',
            'string.min': `"Telepon" should have a minimum length of {#limit}`,
            'string.max': `"Telepon" should have a maximum length of {#limit}`
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateEmail(value) {
            const schema = Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).required().messages({
            'string.email': 'Email harus valid',
            'any.required': 'Email tidak boleh kosong',
            'string.empty': 'Email tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }

            // All is good
            return true;
            },
            validateAsalSekolah(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,30}$')).required().messages({
            'any.required': 'Asal Sekolah tidak boleh kosong',
            'string.empty': 'Asal Sekolah tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateNisn(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,30}$')).required().messages({
            'any.required': 'NISN Sekolah tidak boleh kosong',
            'string.empty': 'NISN Sekolah tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateNis(value) {
            const schema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,30}$')).required().messages({
            'any.required': 'NIS tidak boleh kosong',
            'string.empty': 'NIS tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateTahunMasuk(value) {
            const schema = Joi.string().pattern(new RegExp('^[0-9 ]{3,30}$')).required().messages({
            'any.required': 'Tahun Masuk tidak boleh kosong',
            'string.empty': 'Tahun Masuk tidak boleh kosong',
            })
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        validateAgama(value) {
            const schema = Joi.string().valid('Islam', 'Kristen', 'Katholik', 'Hindu', 'Budha', 'Konghucu').required().messages({
                'any.required': 'Agama tidak boleh kosong',
                'string.empty': 'Agama tidak boleh kosong',
                'any.only': 'Kolom Agama harus di isi, tidak boleh kosong'
            });
            const { error } = schema.validate(value);
            if (error) {
                return error.message;
            }
            return true;
        },
        closeModal() {
                this.prevStep();
                this.$emit('close-modal');
                this.date = ''
        }
        }, 
        beforeDestroy() {
            this.uploadedImageUrl = ''; // Reset image URL when form is closed
         }
    }
</script>
<style>
    .DialogPanel {
        /* Existing styles... */
        overflow-y: auto;
    }
    .v-stepper-item--selected .v-stepper-item__avatar.v-avatar, .v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
    background-color: rgb(70, 172, 64); border-color: rgb(70, 172, 64);
}

.step-border > .v-stepper__content {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}

.v-divider {
    opacity: 5;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* For Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
.cropper {
        height: 600px;
        background: #DDD;
    }
</style>