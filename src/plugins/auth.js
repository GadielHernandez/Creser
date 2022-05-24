import { firebase, auth } from './firebase'
import axios from 'axios'
import Vue from 'vue'

class Auth {
    FirebaseAuthAux = null

    constructor() {
        if (!this.FirebaseAuthAux) {
            this.FirebaseAuthAux = firebase.initializeApp(
                firebase.app().options,
                'auth-worker'
            )
            this.FirebaseAuthAux.auth().setPersistence(
                firebase.auth.Auth.Persistence.NONE
            )
        }
    }

    async signIn(email, password) {
        try {
            const signIn = await this.FirebaseAuthAux.auth().signInWithEmailAndPassword(
                email,
                password
            )
            const idToken = await signIn.user.getIdToken()

            const authRequest = await axios.post(
                `${process.env.VUE_APP_API_BASE_URL}/auth`,
                { idToken }
            )

            await auth.signInWithCustomToken(authRequest.data.token)
            Vue.$cookies.set('TOKEN_AUTH', authRequest.data.token)

            return { message: 'success' }
        } catch (error) {
            if (error.code === 'auth/wrong-password')
                return { error: 'Constraseña incorrecta' }
            if (error.code === 'auth/user-not-found')
                return { error: 'El correo no esta registrado' }
            return { error: 'Revisa los datos' }
        }
    }

    async confirmSignIn() {
        try {
            const idToken = await auth.currentUser.getIdToken()

            await axios.post(
                `${process.env.VUE_APP_API_BASE_URL}/auth/validToken`,
                { idToken }
            )

            return { confirmed: true }
        } catch (error) {
            return { confirmed: false }
        }
    }

    signOut(){
        Vue.$cookies.remove('TOKEN_AUTH')
    }

}

export default new Auth()
