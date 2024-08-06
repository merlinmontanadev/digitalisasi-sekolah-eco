import { defineStore } from 'pinia';

export const useSidebarStore = defineStore({
  id: 'sidebar',
  state: () => ({
    activeLink: null,
  }),
  actions: {
    setActiveLink(link) {
      this.activeLink = link;
    },
  },
});