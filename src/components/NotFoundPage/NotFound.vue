<template>
          <div class="mt-4 h-full w-full p-4">
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <h3>{{ formattedTitle }}</h3>
              <h1>
                <span v-for="(digit, index) in formattedErrorCode" :key="index">
                  {{ digit }}
                </span>
              </h1>
            </div>
            <h2>{{ formattedDesc }}</h2>
            <router-link to="/admin/dashboard">
              <v-btn color="primary">Kembali</v-btn>
            </router-link>
          </div>
        </div>
      </div>
</template>
<script>
import { array } from 'joi';

export default {
  name: "NotFound",
  props: {
    notfoundData: {
      type: array,
      default: () => [],
    },
  },

  computed: {

    formattedTitle() {
      return this.notfoundData[0] || 'Oops! Not found Page';
    },
    formattedErrorCode() {
      const errorCode = this.notfoundData[2] || '404';
      return String(errorCode).split('');
    },
    formattedDesc() {
      return this.notfoundData[1] || 'Sorry, the page you requested cannot be founded';
    },
  }
}

</script>
<style src="@assets/css/css_404.css"></style>