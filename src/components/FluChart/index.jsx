import React, {useEffect, useState} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import 'chart.js/auto';
import styles from "../Home/styles.module.css";

const Home = () => {
    const [data, setData] = useState([]
    )
    const [error, setError] = useState("")
    useEffect((e)=> {
        try {
            const url = "https://localhost:7241/api/Data/flu"
            axios.get(url)
                .then(res => {
                    setData(res.data)
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
    },[]);

    const barData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: ["#32CD32","#32CD32","#32CD32","#FF4500"],
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    fontSize: 15,
                    borderWidth: 0.3,
                    borderColor: 'white'
                }
            },
            y: {
                grid: {
                    borderWidth: 0.3,
                    borderColor: 'white'
                }
            }
        }
    }
    return (
        <div>
            <h4>Liczba zachorowań lub podejrzeń zachorowań na grype</h4>
            <Bar data={barData} options ={options}/>
        </div>

    )
}

export default Home;
