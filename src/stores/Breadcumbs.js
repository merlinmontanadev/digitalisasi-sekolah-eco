import { defineStore } from 'pinia';

export const useBreadcrumbsStore = defineStore({
  id: 'breadcrumbs',
  state: () => ({
    crumbs: [],
  }),
  actions: {
    addCrumb(crumb) {
      this.crumbs.push(crumb);
    },
    clearCrumbs() {
      this.crumbs = [];
    },
  },
});