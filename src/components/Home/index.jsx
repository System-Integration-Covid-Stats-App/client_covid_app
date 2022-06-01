import React from "react";
import styles from "./styles.module.css"
import Navbar from "../Navbar";


const Home = () => {
    return (
        <div className={styles.sect1}>
            <Navbar/>
            <div className={styles.container}>
                <h1>Pizza House</h1>
                <div className={styles.description}>
                    <p>Najlepsza pizza z restauracji w Lublinie!
                        Masz ochotę na prawdziwą pizzę, której smak zwyczajnie Cię zachwyci? Koniecznie sprawdź nasze
                        menu i dołącz do ogromnego grona Klientów, którzy regularnie zamawiają naszą smakowitą pizzę z
                        dostawą w Lublinie!</p>
                </div>
            </div>
        </div>

    )
}

export default Home;
