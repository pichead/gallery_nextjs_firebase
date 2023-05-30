// import * as firebase from "firebase/app";
// import "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc,getDocs,addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
const app = initializeApp(config);
const firestore = getFirestore(app);



export { firestore,collection,doc,setDoc,getDoc,getDocs,getStorage,ref,uploadBytes, uploadBytesResumable, getDownloadURL,addDoc}