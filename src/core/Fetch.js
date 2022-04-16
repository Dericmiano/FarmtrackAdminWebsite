import React, {useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './News.css'
function Fetch() {
    const [allDocs, setAllDocs] = useState([]);
    const db = firebase.firestore();
    
    function fetchAll(e) {
        e.preventDefault();
        db.collection("Journal")
            .get()
            .then((snapshot)=>{
                if (snapshot.docs.length > 0){
                    snapshot.docs.forEach((doc)=>{
                        setAllDocs((prev)=>{
                            return[...prev,doc.data()];
                        });
                    });
                }
            });
        console.log(allDocs)
        
    }


    return(
        <div>
            <h1>Fetching data</h1>

            <button onClick={fetchAll}>Fetch all</button>
            <div>
                {
                    allDocs.map((doc)=>{
                        return(
                            <div>
                                <img className='myImage' src={doc.imageUrl} alt='img'/>
                                <h2>{doc.thought}</h2>
                                {/*<h2>{doc.timeAdded}</h2>*/}
                                <h2>{doc.title}</h2>
                                <h2>{doc.username}</h2>
                                <h2>{doc.userId}</h2>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )

}
export default Fetch;