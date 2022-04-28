<template>
    <v-app-bar
        outlined
        color="white" 
        flat
        class="px-0 py-3 navbar"
        height="unset"
    >
        <slot name="title" />
        
        <v-spacer></v-spacer>

        <v-menu
            :close-on-content-click="false"
            offset-x
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" fab color="white">
                    <img
                        src="@/assets/icon.png"
                    >
                </v-btn>
            </template>

            <v-card width="300">
                <v-img src="@/assets/background-login.png" cover width="300" height="100">
                    <div class="d-flex" style="height: 100%">
                        <v-img src="@/assets/logo.png" max-width="200" class="ma-auto"></v-img>
                    </div>
                </v-img>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list-item v-if="profile">
                        <v-list-item-avatar>
                            <v-icon>
                                mdi-account-circle
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ profile.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
                <v-divider></v-divider>
                <v-list dense nav>
                    <v-list-item @click="logout">
                        <v-list-item-content>
                            <v-list-item-title>Cerrar sesión</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>mdi-logout-variant</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'navbar',
    props: ['height'],
    computed:{
        ...mapState({ profile: state => state.user.profile })
    },
    methods: {
        ...mapActions({ doLogout: 'user/logout' }),
        async logout(){
            try {
                await this.doLogout()
                location.href = "https://creser.fuentedevida.com.mx/login"
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>

<style scoped>
header.navbar > div{
    padding-left: 0 !important;
    padding-right: 0;
}
</style>