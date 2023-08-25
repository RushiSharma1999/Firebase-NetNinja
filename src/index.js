import {initializeApp} from 'firebase/app';
import{
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc,
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

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
const auth = getAuth();

//collection references
const colRef = collection(db, 'books');

//queries
const q = query(colRef, orderBy("createdAt"));

//realtime collection data
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.forEach((doc) => {
        books.push({
            ...doc.data(), id: doc.id
        });
    })
    console.log(books);
});

//add book function
const addBookForm = document.querySelector('.add');

//listen for submit event on the form
addBookForm.addEventListener('submit', (e) => { 
    //prevent default action which is refersing screen
    e.preventDefault();

    //store form values in variables
    const title = addBookForm.title.value;
    const author = addBookForm.author.value;
    const createdAt = serverTimestamp();

    //add document to collection with values received from form
    addDoc(colRef, {
        title, 
        author,
        createdAt
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

//fetcg single document
const docRef = doc(db, 'books', 'I0RQ39s4TMmHZRZLGB3k');

//get document
onSnapshot(docRef, (doc) => {
    //print document data and id to console
    console.log(doc.data(), doc.id);
})

//update document
const updateForm = document.querySelector('.update')
//listen for submit event on the form
updateForm.addEventListener('submit', (e) => {
    //prevent default action which is refersing screen
    e.preventDefault();

    //store document reference in a variable
    const docRef = doc(db, 'books', updateForm.id.value);

    //store form values in variables
    const title = updateForm.title.value;

    //update document
    updateDoc(docRef, {
        title: "Updated Title"
    })
    .then(() => {
        //reset form once doc is deleted
        updateForm.reset();
    });
});

//sign up
const signupForm = document.querySelector('.signup');
//listen for submit event on the form
signupForm.addEventListener('submit', (e) => {
    //prevent default action which is refersing screen
    e.preventDefault();

    //get user info
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        //display user info on console
        console.log('user created: ', cred.user);
        //clear form
        signupForm.reset();
    })
    .catch((err) => {
        console.log(err.message);
    })
});



