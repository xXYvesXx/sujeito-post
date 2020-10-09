import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: 'AIzaSyAoBaWc03-ecdHRTO0ffIG-onBWOV4msgM',
  authDomain: 'sujeito-f03f7.firebaseapp.com',
  databaseURL: 'https://sujeito-f03f7.firebaseio.com',
  projectId: 'sujeito-f03f7',
  storageBucket: 'sujeito-f03f7.appspot.com',
  messagingSenderId: '935653356671',
  appId: '1:935653356671:web:cf53d8accf26a35e3ebb4a',
  measurementId: 'G-ZZK2MQR8QG',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
