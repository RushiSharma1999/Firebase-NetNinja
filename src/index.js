import {initializeApp} from 'firebase/app';
import{
    getFirestore, collection, getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnLfWVMKfGGcBSm2Wz3s1x3i654Ywl2Jo",
    authDomain: "fir-9-dojo-b1b4d.firebaseapp.com",
    projectId: "fir-9-dojo-b1b4d",
    storageBucket: "fir-9-dojo-b1b4d.appspot.com",
    messagingSenderId: "948329798887",
    appId: "1:948329798887:web:bb9958c788724b5effd642"
  };

//initialize firebase
initializeApp(firebaseConfig);

//initialize services
const db = getFirestore();

//collection references
const colRef = collection(db, 'books');

//get collection data
getDocs(colRef)
.then((snapshot) => {
    let books = [];
    snapshot.forEach((doc) => {
        books.push({
            ...doc.data(), id: doc.id
        });
    })
    console.log(books);
})
.catch(err => {
    console.log(err.message);
})
