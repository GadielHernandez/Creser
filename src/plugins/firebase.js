import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: `${process.env.VUE_APP_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.VUE_APP_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: `${process.env.VUE_APP_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.MESSAGING_SEND_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEAS_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()
const timeServer = firebase.firestore.Timestamp.now
const FieldValue = firebase.firestore.FieldValue

export {
    auth,
    db,
    timeServer,
    FieldValue,
    firebase
}