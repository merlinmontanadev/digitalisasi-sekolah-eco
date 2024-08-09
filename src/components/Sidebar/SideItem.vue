<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {computed} from "vue";
import { ChevronRightIcon } from "@heroicons/vue/24/solid"

const props = defineProps({
  item: Object,
});
 
</script>
<template>
  <div class="mt-2">
  <!--Start: Single Menu-->
  <div v-if="item.single" class="py-3 px-3 text-gray-500 text-sm" >{{ item.group }}</div>
  <router-link
    v-if="!item.children.length"
    :to="item.href"
    :class="[
      'group flex w-full items-center rounded-md py-3 px-3 text-sm hover:bg-gradient-to-r from-blue-700 to-blue-500 hover:text-white text-gray-500',
    ]"
  >
    <component
      :class="[
        'mr-2 h-6 w-6 shrink-0 group-hover:text-white text-gray-500'
      ]"
      :is="item.icon"
      v-if="item.icon"
    ></component>
    <span>{{ item.label }}</span>
  </router-link>
  <!--End: Single Menu-->
  <!--Start: Multi Menu-->
  <Disclosure
    v-else
    v-slot="{open}">
    <DisclosureButton
      :class="[
        'group flex w-full items-center rounded-md py-3 px-3 text-left text-sm my-1 hover:text-white hover:bg-gradient-to-r from-blue-700 to-blue-500 text-gray-500'
      ]">
      <component
        :class="[
          'mr-2 h-6 w-6 shrink-0 group-hover:text-white text-gray-500'
        ]"
        :is="item.icon"
        v-if="item.icon"
      >
    </component>
      <span class="flex-1">{{ item.label }}</span>
      <ChevronRightIcon
        :class="[
          'h-6 w-6 shrink-0 group-hover:text-white text-gray-500',
          open ? 'rotate-90 text-gray-500' : 'text-gray-500',
        ]"

      />
      
    </DisclosureButton>
    <!--End: Multi Menu-->
    <!--Start: Sub Menu-->
    <DisclosurePanel class="ml-8">
      <SideItem
        v-for="child in item.children"
        :item="child"
        :key="child.label"
      />
    </DisclosurePanel>
    <!--End: Sub Menu-->
  </Disclosure>
</div>
</template>