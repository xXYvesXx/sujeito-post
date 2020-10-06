import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: 'AIzaSyCpfLpQrInumU93esIfpipugEY40foqVYQ',
  authDomain: 'sujeitopost-84885.firebaseapp.com',
  databaseURL: 'https://sujeitopost-84885.firebaseio.com',
  projectId: 'sujeitopost-84885',
  storageBucket: 'sujeitopost-84885.appspot.com',
  messagingSenderId: '178127585270',
  appId: '1:178127585270:web:679356ee310934e10491d7',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
