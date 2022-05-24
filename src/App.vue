<template>
    <v-app>
        <v-main class="main-background">
            <router-view v-if="loaded" />
            <div v-else class="loading_view">
                <v-progress-circular
                    size="70"
                    indeterminate
                    color="primary"
                >
                    <v-img src="@/assets/icon.png" />
                </v-progress-circular>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'app',
    computed: {
        ...mapState({
            loaded: (state) => state.user.loaded,
        }),
    },
}
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
}
.main-background {
    background-color: white;
}
.v-card {
    border-radius: 15px !important;
}
.v-footer {
    bottom: 0 !important;
}
.h-100 {
    height: 100%;
}
.loading_view {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.center-vertical {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
