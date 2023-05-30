import { firestore,collection,addDoc,doc,setDoc,getDoc,getDocs,getStorage,ref,uploadBytes, uploadBytesResumable, getDownloadURL,deleteObject,deleteDoc  } from "./firebase";

// const galleryRef = collection(firestore, "gallery");
let storage = getStorage();


const getGallery = async () => {
    // const docRef = await getDocs(collection(firestore, "gallery"));
    const data = await getDocs(collection(firestore, "gallery"));
    let res = [];
    data.forEach( async (doc) => {
        res.push({
            docId: doc.id,
            name:doc.data().name,
            src:doc.data().src
        })
        // let url = doc.data().src.replace("https://firebasestorage.googleapis.com/v0/b/mademypizza.appspot.com/o/images%2F","")
        // let filename = url.split('?')[0]
        // console.log(filename)
        // updateGallery(doc.id,filename)
        // split_url = .split('/')

        // last_part = split_url[-1]

        // filename = last_part.split('?')[0]
        // console.log(filename)
    })
    return res;
}


const saveImage = async (file) => {
    const timestamp = String(Math.round(+new Date()/1000))
    let newFilename = timestamp+file.name
    const storageRef = ref(storage, 'images/'+newFilename);

    const uploadTask = await uploadBytesResumable(storageRef, file);
    const geturl = await getDownloadURL(uploadTask.ref)
    // console.log("Upload task: " ,uploadTask)
    console.log("Upload task: " ,geturl)

    const saveurl = await addDoc(collection(firestore, "gallery", ), {
            src: geturl,
            name:newFilename
        });
    return saveurl
    // uploadTask.on('state_changed', 
    // (snapshot) => {

    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //     case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //     case 'running':
    //         console.log('Upload is running');
    //         break;
    //     }
    // }, 
    // (error) => {
    // }, 
    //  async () => {

    //     const geturl = await getDownloadURL(uploadTask.snapshot.ref)

    //     const saveurl = await addDoc(collection(firestore, "gallery", ), {
    //         src: geturl,
    //     });

    //     return saveurl

    // }
    // );
}

const delImage = async (filename,docId) => {
    const desertRef = ref(storage, "/images/"+filename);
    await deleteObject(desertRef)
    await deleteDoc(doc(firestore, "gallery", docId));

    return "successfully deleted"
}


// const updateGallery = async (docId,data) => {
//     let update = await setDoc(doc(firestore, "gallery",docId), {
//         name: data,
//         src:"https://firebasestorage.googleapis.com/v0/b/mademypizza.appspot.com/o/images%2F"+data+"?alt=media&token=8823c378-8a7c-4685-b227-aa7573d9e07c"
//       });
//     return update;
// }


export { getGallery,saveImage,delImage } 