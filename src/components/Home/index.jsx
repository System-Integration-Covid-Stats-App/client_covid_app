import React, {useEffect, useState} from "react";
import styles from "./styles.module.css"
import Navbar from "../Navbar";
import BarChart from "../BalanceOfServicesChart";
import DeathsCovidChart from "../DeathsCovidChart";
import BlikChart from "../BlikChart";
import FluChart from "../FluChart";



const Home = () => {
    const [component, setComponent] = useState("BalanceOfServices");
    return (
        <div className={styles.sect1}>
            <Navbar/>
            <div className={styles.container}>
                <select onChange={(e)=>setComponent(e.target.value)}>
                    <option value = "BalanceOfServices">Saldo usług</option>
                    <option value = "DeathsCovid">Liczba zgonów</option>
                    <option value = "Blik">Blik</option>
                    <option value = "Flu">Flu</option>
                </select>
                {(component === "BalanceOfServices" || component === {}) && <BarChart/>}
                {(component === "DeathsCovid" || component === {}) && <DeathsCovidChart/>}
                {(component === "Blik" || component === {}) && <BlikChart/>}
                {(component === "Flu" || component === {}) && <FluChart/>}
            </div>
            <div className={styles.description}>
                <div className={styles.square}>Przed pandemią</div><br/>
                <div className={styles.square2}>Pandemia</div>
            </div>
        </div>

    )
}

export default Home;
