import React, {useEffect} from "react";
import Navbar from "../Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, ListGroup} from "react-bootstrap";
import { useState } from "react"
import axios from "axios";
import styles from "./styles.module.css"

const Account = () => {
    const [username, setName] = useState({
        username: "",
    })
    const [email, setEmail] = useState({
        email: ""
    })
    const [users, setUsers] = useState([])
    let decodeToke = parseJwt(localStorage.getItem("token"))
    let id = decodeToke.id;
    let role = decodeToke.role;
    function updateUserData() {
        let url = "https://localhost:7241/api/users/updateAccount/" + id;
        axios
            .patch(url,{
                Username:username,
                Email:email,
            }, {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    function deleteAccount(id){
        console.log(id);
        let url = "https://localhost:7241/api/users/deleteAccount/" + id;
        axios
            .delete(url,{
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => {
                if(role === "admin") window.location.reload()
                if(role === "user"){
                    if(localStorage.getItem("token") != null){
                        localStorage.removeItem("token")

                    }
                    window.location = "/Login"
                }
            })
            .catch(err=>{
                console.log(err)
            })

    }
    useEffect(() => {
        if(role === "user"){
            let url = "https://localhost:7241/api/Users/user/" + id;
            axios
                .get(url, {
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                })
                .then(res => {
                    setName(res.data.username)
                    setEmail(res.data.email)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },[])
    useEffect(() => {
        if(role === "admin"){
            let url = "https://localhost:7241/api/Admin/users";
            axios
                .get(url, {
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                })
                .then(res => {
                    console.log(res.data)
                    setUsers(res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },[])


    return (
        <div >
            <Navbar/>
            { role === "user" &&
            <Form className={styles.container}>
                <h1>Twoje dane</h1>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Button type='button' variant="primary" onClick={updateUserData}>
                        Edytuj dane
                    </Button><br/><br/>
                    <Button type='button' variant="danger" onClick={() =>deleteAccount(id)}>
                        Usuń konto
                    </Button>
                </Form>
            },
            {
                role === "admin" &&
                <div>
                    <h1>Dane użytkowników</h1>
                    {
                        users.map(function (item,index){
                            return(
                                <div key={index} className={styles.container}>
                                    <ListGroup as="ol" numbered>
                                        <ListGroup.Item variant="dark">
                                            <p>Id: {item.userId}</p>
                                            <p>Login: {item.username}</p>
                                            <p>Email: {item.email}</p>
                                            <Button type='button' variant="danger" onClick={() => deleteAccount(item.userId)}>
                                                Usuń konto
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <br/>
                                </div>
                            )
                        })
                    }
                </div>
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
