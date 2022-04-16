import React, {useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './News.css'



function News() {
    const [contact, setContact] = useState({name: "", description: ""});
    const [singleImage, setSingleImage] = useState("");


    const db = firebase.firestore();
    const storage = firebase.storage();


    const handleChange = (event) => {
        event.preventDefault();
        const  {name, value} = event.target;
        setContact((prev)=> {
            return {...prev, [name]:value};
        });
    };
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
        const  uploadTask = storage.ref(`SingleImage/${singleImage.name}`)
            // .child(singleImage.name)
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
                    .child(singleImage.name)
                    .getDownloadURL()
                    .then((imageUrl)=>{
                        db.collection("News")
                            .add({
                                imageUrl:imageUrl,
                                name: contact.name,
                                description: contact.description
                            }).then((docRef) => {
                            const docId = docRef.id;
                            console.log("dcId"+docId)
                             }).catch((err)=>{
                            console.log("Error"+err.message);
                            });
                    });
            }

        )


    }



    return (
        <div>
            <h1>Post news to Farmers</h1>
            <form onSubmit={singleUpload} className='myForm'>
                <label>enter your title</label>
                <input className='myInput'
                       required
                    type='text'
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    placeholder="your title"/>
                <label>Enter your description</label>
                <textarea
                    required
                    className='myText'
                    // type='textarea'
                    name="description"
                    value={contact.description}
                    onChange={handleChange}
                    placeholder="your description"/>
                <label>Pick a photo for your subject</label>
                <input
                    required
                    className='myInput'
                    type="file"
                    onChange={handleChangeImage}/>

                <button className='btn'>
                    Save News Blog
                </button>
            </form>

        </div>
    )

}
export default News;