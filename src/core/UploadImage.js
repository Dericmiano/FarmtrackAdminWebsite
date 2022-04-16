import React, {useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function UploadImage() {
    const [singleImage, setSingleImage] = useState("");

    const db = firebase.firestore();
    const storage = firebase.storage();

    function handleChangeImage(e) {
        e.preventDefault();
        let pickedFile;
        if (e.target.files && e.target.files.length > 0){
            pickedFile = e.target.files[0];
            setSingleImage(pickedFile)
        }
    }
    function singleUpload(e) {
        e.preventDefault();
        const  uploadTask = storage.ref("SingleImage")
            .child("Image1")
            .put(singleImage);
        uploadTask.on(
            "state changed",
            (snapshot)=>{
                let progress = ((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
                console.log(progress);
            },
            (err) => {
                console.log(err)
            },
            ()=>{
                storage.ref("SingleImage")
                    .child("Image1")
                    .getDownloadURL()
                    .then((imageUrl)=>{
                        db.collection("Images")
                            .add({
                                imageUrl:imageUrl,
                            });
                    })
            });}


    return(
        <div>
            <h1>Uploading images</h1>
            <input type="file" onChange={handleChangeImage}/>
            <button onClick={singleUpload}>Upload Image</button>
        </div>
    )

}
export default UploadImage