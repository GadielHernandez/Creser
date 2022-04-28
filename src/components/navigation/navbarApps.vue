<template>
    <div>
        <v-toolbar class="px-md-16" flat>
            <v-tabs v-model="tabs" class="mx-md-1" :color="colorActive">
                <v-tab @click="go('Home')">
                        <v-avatar
                            :color="'primary'"
                            size="35"
                            class=""
                        >
                            <v-icon class="white--text" v-if="level === ADMIN">
                                mdi-account
                            </v-icon> 
                            <v-icon class="white--text" v-else>
                                mdi-home
                            </v-icon> 

                        </v-avatar>
                        <span class="ml-3 ma-auto" v-if="level === ADMIN">Usuarios</span>
                        <span class="ml-3 ma-auto" v-else>Inicio</span>
                </v-tab>
                <v-tab @click="go('Academia')">
                    <div>
                        <v-avatar
                            color="academia-primary"
                            size="35"
                        >
                            <v-icon class="white--text" >
                                mdi-school
                            </v-icon>
                        </v-avatar>
                        <span class="ml-3 ma-auto">Academia</span>
                    </div>
                </v-tab>
            </v-tabs>
        </v-toolbar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ADMIN } from '../../plugins/user-types'
export default {
    name: 'navbarApps',
    computed:{
        ...mapState({ level: state => state.user.profile.level }),
        colorActive(){
            const colors = ['primary', 'academia-primary']
            return colors[this.tabs]
        }
    },
    data() {
        return {
            tabs: 0,
            tabs_value: ['Home' ,'Academia'],
            courses_id: {
                Academia: 'JgoBlXYdaGKpGF5tV98x'
            },
            ADMIN
        }
    },
    methods: {
        ...mapActions({
            changeCourse: 'user/selectCourse'
        }),
        async go(name) {
            if (this.$route.name === name) return
            if (this.courses_id[name]) await this.changeCourse(this.courses_id[name])
            this.$router.push({ name: name })
        },
    },
    mounted() {
        const index = this.tabs_value.findIndex((t) => t === this.$route.name)
        if (index >= 0) this.tabs = index
    },
}
</script>

<style scoped>
.v-tab {
    text-transform: none !important;
}
</style>
