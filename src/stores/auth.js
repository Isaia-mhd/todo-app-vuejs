import { defineStore } from 'pinia'
import axios from 'axios'

const useAuthStore = defineStore('auth', {
    // state
    state: () => ({
        user: null,
        authChecked: false
    }),
    // actions
    actions: {
        //get token
        async getToken()
        {
            await axios.get('/sanctum/csrf-cookie')
        },
        // login user
        async login(credentials)
        {
            try {
                await this.getToken()

                const res = await axios.post('/api/login', {
                    email: credentials.email,
                    password: credentials.password 
                })

                this.user = res.data.user
                
                return res.data

            } catch (error) {
                console.log('Login error: ', error);
                
                throw error
            }
            
        },

        // create new user 
        async register(infos)
        {
            try {
                await this.getToken()

                const res = await axios.post('/api/register', infos)
                
                return res.data

            } catch (error) {
                throw error
            }
        },
        
        // get user
        async getUser()
        {
            try {
                await this.getToken()
                const response = await axios.get('/api/user')
                this.user = response.data

            } catch (error) {
                this.user = null
            } finally {
                this.authChecked = true
            }
            
        },
        async logout()
        {
            try {
                await this.getToken()
                await axios.post('/api/logout')
                this.user = null

            } catch (error) {
                throw error
            } finally {
                this.authChecked = true
            }
        }
    },
    // getters
    getters: {
        loggedIn: (state) => !!state.userAuth  
    }
})

export default useAuthStore