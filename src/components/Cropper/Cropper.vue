<template>
	<cropper
        class="h-64 w-64"
		:src="img"
		@change="change"
        :aspectRatio="aspectRatio"
        :resizeImage="false"
        :restrictPosition="true"
        :stencil-props="{
            aspectRatio: 10/10,
            movable: true,
            resizable: false  
        }"
	/>
</template>
<style scoped>
</style>
<script>
import { defineComponent } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default defineComponent({
	components: {
		Cropper,
	},
	data() {
		return {
			img: 'https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg',
            aspectRatio: 1,
        };
	},
	methods: {
		change({ coordinates, canvas }) {
			console.log(coordinates, canvas);
		},
	},
});
</script>