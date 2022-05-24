import { auth, db } from '../../plugins/firebase'
import AuthHelper from '../../plugins/auth'

const state = {
    profile: null,
    loaded: false
}

const getters = {}

const actions = {
    login( ctx, credentials){
        return new Promise((resolve, reject) => {
            if(auth.currentUser) return resolve({ message: 'Ya esta logueado' })
            
            AuthHelper.signIn(credentials.email, credentials.password)
            .then( (result) => {
                if(result.error) return reject({ message: result.error })
                return resolve({ message: 'Login exitoso' })
            })
            .catch( () => reject({ message: 'Revisa los datos' }) )
        })
    },
    logout(){
        return new Promise((resolve, reject) => {
            if(!auth.currentUser) return resolve({ message: 'No esta logueado' })

            auth.signOut()
            .then( () => {
                AuthHelper.signOut()
                return resolve({ message: 'Logout exitoso' }) 
            })
            .catch( () => reject({ message: 'Error al cerrar sesion' }) )
        })
    },
    fetchProfile({ commit }){
        return new Promise((resolve, reject) => {
            db.doc(`users/${auth.currentUser.uid}`).get()
            .then( async doc => {
                const profile = doc.data()
                commit( 'UPDATE_PROFILE', profile )
                commit( 'UPDATE_LOADED', true )
                return resolve()
            })
            .catch( () => reject() )
        })
    },
    updateLoaded({ commit }, status){
        commit( 'UPDATE_LOADED', status )
    },
    confirmLogin(){
        return new Promise((resolve) => {
            AuthHelper.confirmSignIn().then((result) => resolve(result))
        })
    }
}

const mutations = {
    UPDATE_PROFILE(state, payload){
        state.profile = payload
    },
    UPDATE_COURSE(state, payload){
        state.course.data = payload
    },
    UPDATE_LOADED(state, status){
        state.loaded = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}