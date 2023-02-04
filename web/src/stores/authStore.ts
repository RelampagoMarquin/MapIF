import { ref } from 'vue';
import { defineStore } from 'pinia';
import { UserLogin } from '../utils/types';
import axios from "axios";
import decode from "jwt-decode"
import router from '../router/index';


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: (localStorage.getItem('token')),
            user: ref(localStorage.getItem('user'))
        }
       },
    getters: {},
    actions: {
        
        async login(login: UserLogin) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, login)
            localStorage.setItem('token', response.data.Authorization)
            localStorage.setItem('user', JSON.stringify(response.data.data))
            if (response){
              router.go(-1)
            }
        },
    
        async signOut(){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        isExpired() {
            const token: any = localStorage.getItem('token');
            try {
              const decodedToken: any = decode(token);
              if (Date.now() >= decodedToken.exp * 1000){
                return true;
              }
              return false;
            } catch (error) {   // O "jwt-decode" lança erros pra tokens inválidos.
              return true; // Com um token inválido o usuário não está assinado.
            }
          },

          isLogged() {
            return window.localStorage.getItem("token");
        },
    }
})