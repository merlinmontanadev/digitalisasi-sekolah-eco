<template>
  <v-container>
    <v-row justify="center">
      <date-picker label="Select a date" v-model="myDate"></date-picker>
    </v-row>
  </v-container>
  </template>
<script>
export default {
  data(){
    return {
      date: null,
      dateFormatted: null,
      open: false
    }
  },
  created() {
        this.date = this.$value;
    },
    methods: {
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null
            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        update() {
            this.$value = this.dateFormatted;
            this.$emit('change', this.dateFormatted);
        }
    },
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
        dateFormatted(val) {
            this.update();
        }
    },
}
</script>