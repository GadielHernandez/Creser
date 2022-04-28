import { auth, db } from '../../plugins/firebase'

const state = {
    profile: null
}

const getters = {}

const actions = {
    login( ctx, credentials){
        return new Promise((resolve, reject) => {
            if(auth.currentUser) return resolve({ message: 'Ya esta logueado' })
            
            auth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then( () => resolve({ message: 'Login exitoso' }))
            .catch( e => {
                if( e.code === 'auth/wrong-password' ) 
                    return reject({ message: 'Constraseña incorrecta' })
                if( e.code === 'auth/user-not-found' ) 
                    return reject({ message: 'El correo no esta registrado' })
                return reject({ message: 'Revisa los datos' })
            })
        })
    },
    logout(){
        return new Promise((resolve, reject) => {
            if(!auth.currentUser) return resolve({ message: 'No esta logueado' })

            auth.signOut()
            .then( () => resolve({ message: 'Logout exitoso' }) )
            .catch( () => reject({ message: 'Error al cerrar sesion' }) )
        })
    },
    fetchProfile({ commit }){
        return new Promise((resolve, reject) => {
            db.doc(`users/${auth.currentUser.uid}`).get()
            .then( async doc => {
                const profile = doc.data()
                commit( 'UPDATE_PROFILE', profile )
                return resolve()
            })
            .catch( () => reject() )
        })
    }
}

const mutations = {
    UPDATE_PROFILE(state, payload){
        state.profile = payload
    },
    UPDATE_COURSE(state, payload){
        state.course.data = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}