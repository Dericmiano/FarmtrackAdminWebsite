import React, {useEffect, useState} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Table} from "react-bootstrap";
function Expense() {
    const [allExpenses, setAllExpenses] = useState([]);
    const db = firebase.firestore();
    
    function fetchAll() {
        // e.preventDefault();
        db.collection("Expenses")
            .get()
            .then((snapshot)=>{
                if (snapshot.docs.length > 0){
                    snapshot.docs.forEach((doc)=>{
                        setAllExpenses((prev)=>{
                            return[...prev, doc.data()];
                        });
                    });
                }
            });
        console.log(allExpenses);
        
    }

    // useEffect(() => {
    //     return () => {
    //         fetchAll();
    //     };
    // }, [fetchAll,allExpenses]);


    return(
        <div>
            <button onClick={fetchAll}>fetch the expenses</button>
            <div>
                <Table striped bordered hover>

                <thead>
                <tr>
                    <th>project name</th>
                    <th>chemical</th>
                    <th>ploughing</th>
                    <th>fertiliser</th>
                    <th>Tractors</th>
                    <th>Labour</th>
                    <th>Seedlings</th>
                    <th>Water</th>
                    <th>Manure</th>
                    <th>Weeding</th>
                    <th>Total sales</th>
                </tr>
                </thead>
                {
                    allExpenses.map((doc)=> {
                        return (

                            <tbody>
                            <tr>
                                <td>{doc.expense}</td>
                                <td>{doc.chemicals}</td>
                                <td>{doc.ploughing}</td>
                                <td>{doc.fertiliser}</td>
                                <td>{doc.machinery}</td>
                                <td>{doc.labour}</td>
                                <td>{doc.seedling}</td>
                                <td>{doc.water}</td>
                                <td>{doc.manure}</td>
                                <td>{doc.weeding}</td>
                                <td>{doc.sales}</td>

                            </tr>
                            </tbody>
                        )
                    })


                    })
                </Table>


            </div>


        </div>
    )
    
}
export default Expense;