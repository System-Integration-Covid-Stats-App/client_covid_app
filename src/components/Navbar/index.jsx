import React, {Component} from "react";
import {Navbar,Container,Nav} from "react-bootstrap";
import styles from "./styles.module.css"

const navbar = () => {
    const getNameOfButton = () =>{
        if(localStorage.getItem("token") != null){
            return  "Logout"
        }else return 'Login';
    }
    const action = () =>{
        if(localStorage.getItem("token") != null){
            localStorage.removeItem("token")

        }
        window.location = "/Login"
    }
    const getNameOfButtonAccount = () =>{
        if(localStorage.getItem("token") != null){
            return  "Moje Konto"
        }else return 'Zarejestruj się';
    }
    const actionAccount = () =>{
        console.log(localStorage.getItem("token"));
        if(localStorage.getItem("token") != null){
            window.location = "/account"
        }
        else window.location = "/signup"
    }

    return (
        <div className={styles.navigation}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">CovidStatsApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav.Link href="/account">Konto</Nav.Link>
                        <Nav className={styles.login}>
                            <Nav.Link onClick={action}>{getNameOfButton()}</Nav.Link>
                        </Nav>
                        <Nav className={styles.login}>
                            <Nav.Link onClick={actionAccount}>{getNameOfButtonAccount()}</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    )
}
export default navbar;
