<template>
    <div>
        
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { auth } from '../plugins/firebase'

export default {
    name: 'Logout',
    methods: {
        ...mapActions({
            logout: 'user/logout'
        })
    },
    async mounted(){
        if(auth.currentUser){
            await this.logout()
        }
        
        this.$router.push({ name: 'login' })
    }
}
</script>