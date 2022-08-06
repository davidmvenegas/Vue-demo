import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ref, onUnmounted } from 'vue';

const config = {
    apiKey: "AIzaSyCntSzW0gNc1AiW-QmbCCF4msbCATlXVM4",
    authDomain: "vuemanagement-dab57.firebaseapp.com",
    projectId: "vuemanagement-dab57",
    storageBucket: "vuemanagement-dab57.appspot.com",
    messagingSenderId: "525058735061",
    appId: "1:525058735061:web:24e03eccc1e93fd7d45b5c"
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

// CRUD FUNCTIONS
export const createUser = user => {
    return usersCollection.add(user)
}
export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}
export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user)
}
export const deleteUser = id => {
    return usersCollection.doc(id).delete()
}
export const useLoadUsers = () => {
    const users = ref([])
    const close = usersCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}