import React, {useState} from "react";
import './News.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function Tips() {
    const [tip, setTip] = useState({topic: "", description: "",title:"",date:""});
    const [tipImage, setTipImage] = useState("");

    const db = firebase.firestore();
    const storage = firebase.storage();

    const handleChange = (event) => {
        event.preventDefault();
        const  {name, value} = event.target;
        setTip((prev)=> {
            return {...prev, [name]:value};
        });
    };

    function handleChangeImage(e) {
        e.preventDefault();
        let pickedFile;
        if (e.target.files && e.target.files.length > 0){
            pickedFile = e.target.files[0];
            setTipImage(pickedFile)
        }
    }



    const handleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`TipImage/${tipImage.name}`).put(tipImage);

        uploadTask.on(
            "state changed",
            (snapshot)=>{
                let progress = ((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
                console.log(progress);
            },
            (err) => {
                console.log(err)
            },
            () => {
                storage.ref("TipImage")
                    .child(tipImage.name)
                    .getDownloadURL()
                    .then(imageUrl => {
                        db.collection("Tips")
                            .add({
                                imageUrl:imageUrl,
                                topic:tip.topic,
                                title:tip.title,
                                description:tip.description,
                                date:tip.date,
                            }).then((docRef) => {
                            const docId = docRef.id;
                            console.log("dcId"+docId)
                        }).catch((err)=>{
                            console.log("Error"+err.message);
                        });
                        // setUrl(url);
                    });
            }
        );
    };
    // console.log("image",tipImage);

    return(
        <div>
            <h1>News update Page</h1>

            <form onSubmit={handleUpload} className='myForm'>
                <label>enter your Topic</label>
                <input className='myInput'
                       required
                       type='text'
                       name="topic"
                       value={tip.topic}
                       onChange={handleChange}
                       placeholder="your topic"/>
                <label>enter your title</label>
                <input className='myInput'
                       required
                       type='text'
                       name="title"
                       value={tip.title}
                       onChange={handleChange}
                       placeholder="your title"/>
                <label>enter your date</label>
                <input className='myInput'
                       required
                       type='text'
                       name="date"
                       value={tip.date}
                       onChange={handleChange}
                       placeholder="your date"/>
                <label>enter your description</label>
                <textarea className='myText'
                       required
                       // type='text'
                       name="description"
                       value={tip.description}
                       onChange={handleChange}
                       placeholder="your description"/>

                <input type="file" onChange={handleChangeImage} />
                {/*<button onClick={handleUpload}>Upload</button>*/}
                <button className='btn'>Upload your tips</button>
            </form>

        </div>


    )

}
export default Tips;