import React, {useEffect} from "react";
import Navbar from "../Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import { useState } from "react"
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import styles from "./styles.module.css"

const Account = () => {
    const [firstName, setName] = useState({
        firstName: "",
    })
    const [lastName, setLastName] = useState({
        lastName: "",
    })
    const [email, setEmail] = useState({
        email: ""
    })
    let decodeToke = parseJwt(localStorage.getItem("token"))
    let id = decodeToke._id;

    function updateUserData() {
        let url = "http://localhost:8080/api/users/update/" + id;
        axios
            .patch(url,{
                firstName:firstName,
                lastName:lastName,
                email:email,
            })
            .then(res => {
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    function deleteAccount(){
        let url = "http://localhost:8080/api/users/delete/" + id;
        axios
            .patch(url)
            .then(res => {
                console.log(res)
                if(localStorage.getItem("token") != null){
                    localStorage.removeItem("token")

                }
                window.location = "/Login"
            })
            .catch(err=>{
                console.log(err)
            })

    }
    useEffect(() => {
        let url = "http://localhost:8080/api/users/" + id;
        axios
            .get(url)
            .then(res => {
                setName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])


    return (

        <div >
            <Navbar/>
            <h1>Twoje dane</h1>
            {data &&
            <Form className={styles.container}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Imię</Form.Label>
                        <Form.Control type="text" value={firstName} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                    <Button type='button' variant="primary" onClick={updateUserData}>
                        Edytuj dane
                    </Button><br/><br/>
                    <Button type='button' variant="danger" onClick={deleteAccount}>
                        Usuń konto
                    </Button>
                </Form>
            }
        </div>

    )
}
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export default Account;
