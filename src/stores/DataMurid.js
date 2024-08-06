import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataMuridStore = defineStore("dataMurid", () => {

    const dataMurid = ref([
        {
            nama: "Aldi",
            nisn: "1234567890",
            kelas: "XII RPL 1",
            alamat: "Jl. Raya Cilegon",
        },
        {
            nama: "Aldi",
            nisn: "1234567890",
            kelas: "XII RPL 1",
            alamat: "Jl. Raya Cilegon",
        },
    ])

    const formData = ref({
        indexEdit: -1,
        nama: "",
        nisn: "",
        kelas: "",
        alamat: "",
    })

return {
    dataMurid,
    formData
}
});