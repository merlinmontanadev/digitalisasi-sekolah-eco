import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const useModalStore = defineStore({
  id: 'penggunaStores',
  state: () => ({
    selectedItem: JSON.parse(localStorage.getItem('selectedItem')) || null,
  }),
  actions: {
    setItemSelected(item) {
      this.selectedItem = item;
      localStorage.setItem('selectedItem', JSON.stringify(item));
    },
    clearItemSelected() {
      this.selectedItem = null;
      localStorage.removeItem('selectedItem');
    },
  },
});


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
      initializeUser() {
      const token = Cookies.get('accessToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          this.setUser(decodedToken);
        } catch (error) {
          console.error('Failed to decode token:', error);
          Cookies.remove('accessToken');
        }
      }
    },
  getters: {
    getUser: (state) => state.user,
  },
});