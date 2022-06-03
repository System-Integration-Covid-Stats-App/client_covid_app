import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import Navbar from "../Navbar";
const Login = () => {
    const [data, setData] = useState({
        Username: "",
        Password: "",
    })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "https://localhost:7241/api/Users/authenticate"
            await axios.post(url, data)
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem("token",res.data.token)
                })
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
        if(localStorage.getItem("token")) window.location = ("/");

    }
    return (
    <div>
        <Navbar/>
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container}
                            onSubmit={handleSubmit}>
                            <h1>Login to Your Account</h1>
                            <input
                                type="text"
                                placeholder="username"
                                name="Username"
                                onChange={handleChange}
                                value={data.Username}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="Password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            {error && <div
                                className={styles.error_msg}>{error}</div>}
                            <button type="submit"
                                className={styles.green_btn}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>New Here ?</h1>
                        <Link to="/signup">
                            <button type="button"
                                className={styles.white_btn}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    </div>
    )
}
export default Login;
