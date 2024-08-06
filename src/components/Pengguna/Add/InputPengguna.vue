<template>
    <div class="w-full px-3 sm:w-1/2">
        <Form  @submit="simpan" v-slot="{ values }">
        <div class="mb-2">
            <label for="username" class="block font-semibold  pb-2">
                Username<span class="text-red-500">*</span>
            </label>
            <Field type="text" name="username" id="username" placeholder="Masukan Username....." class="w-full rounded-md block border py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            <ErrorMessage class="text-red-500 mt-2" name="username" />
        </div>
        <div class="mb-2">
            <label for="email" class="block font-semibold  pb-2">
                Email<span class="text-red-500">*</span>
            </label>
            <Field type="text" name="email" id="email" placeholder="Masukan Email....." class="w-full rounded-md block border py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            <ErrorMessage class="text-red-500 mt-2" name="email" />
        </div>
        <div class="mb-2">
            <label for="nohp" class="block font-semibold  pb-2">
                No. HP<span class="text-red-500">*</span>
            </label>
            <Field type="text" name="nohp" id="nohp" placeholder="62xxxx....."  class="w-full rounded-md block border py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
            <ErrorMessage class="text-red-500 mt-2" name="nohp" />
        </div>
        <div class="mb-2">
            <label for="jk" class="block font-semibold  pb-2">
                Jenis Kelamin<span class="text-red-500">*</span>
            </label>
            <Field 
                                                        :rules="validateJK" 
                                                        id="jk" name="jk" as="select" class="w-full rounded-md block border py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                        <option value="">Pilih Jenis Kelamin</option>
                                                        <option value="Pria">Pria</option>
                                                        <option value="Wanita">Wanita</option>
                                                        </Field>
        <ErrorMessage class="text-red-500 mt-2" name="jk" />
        </div>
        <div class="mb-2">
            <label for="foto" class="block font-semibold  pb-2">
                Foto<span class="text-red-500">*</span>
            </label>
            <Field type="file" name="foto" id="foto" class="w-full rounded-md border py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
            <ErrorMessage class="text-red-500 mt-2" name="foto" />
        </div>
        <div class="mb-2">
            <label for="role" class="block font-semibold  pb-2">
                Role<span class="text-red-500">*</span>
            </label>
            <Field 
                                                        :rules="validateRole"
                                                        id="role" name="role" as="select" class="w-full rounded-md block border py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                                                            <option value="">Pilih Role</option>
                                                            <option value="Super Admin">Super Admin</option>
                                                            <option value="Admin">Admin</option>
                                                            <option value="User">User</option>
        </Field>
            <ErrorMessage class="text-red-500 mt-2" name="role" />
        </div>
        <div class="mt-6">
            <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit"> Simpan </button>
        </div>

        <pre>{{ values }}</pre>
    </Form>
        </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

</script>