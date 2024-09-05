<template>
    <Form keep-value>
        <Field type="text" name="select2" id="select2" as="select" class="w-full rounded-sm block py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
        </Field>
        </Form>

 


</template>
<script>
    import {
        Form,
        Field,
        ErrorMessage
    } from 'vee-validate';
</script>
