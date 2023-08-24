import {initializeApp} from 'firebase/app';
import{
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
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

//add book function
const addBookForm = document.querySelector('.add');

//listen for submit event on the form
addBookForm.addEventListener('submit', (e) => { 
    //prevent default action which is refersing screen
    e.preventDefault();

    //store form values in variables
    const title = addBookForm.title.value;
    const author = addBookForm.author.value;

    //add document to collection with values received from form
    addDoc(colRef, {
        title, 
        author
    })
    .then(() => {
    //reset form once new doc is added
      addBookForm.reset();
    })
});

//delete book function
const deleteBookForm = document.querySelector('.delete');

//listen for submit event on the form
deleteBookForm.addEventListener('submit', (e) => {
    //prevent default action which is refersing screen
    e.preventDefault();

    //store form values in variables
    const id = deleteBookForm.id.value;

    //create reference to document to be deleted
    const docRef = doc(db, 'books', id);

    //delete document from collection with values received from form
    deleteDoc(docRef)
    .then(() => {
        //reset form once doc is deleted
        deleteBookForm.reset();
    })
});


