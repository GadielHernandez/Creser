import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueYoutube from 'vue-youtube'
import VueCookies from 'vue-cookies';
import { auth } from './plugins/firebase'
 
Vue.use(VueYoutube)

Vue.use(VueCookies)
Vue.$cookies.config('30d')

Vue.config.productionTip = false

let app

auth.onAuthStateChanged(async () => {
    await store.dispatch('user/updateLoaded', false)
    
    if (!app) {
        app = new Vue({
            vuetify,
            store,
            router,
            render: (h) => h(App)
        }).$mount('#app')
    }
    
    if(auth.currentUser){
        const auth = await store.dispatch('user/confirmLogin')
        if(!auth.confirmed) return
        
        await store.dispatch('user/fetchProfile')
        await store.dispatch('user/updateLoaded', true)
    }
    else
        await store.dispatch('user/updateLoaded', true)
})
