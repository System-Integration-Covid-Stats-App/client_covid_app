import React, {useEffect, useState} from "react";
import axios from "axios";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';

const Home = () => {
    const [data, setData] = useState([]
    )
    const [error, setError] = useState("")
    useEffect((e)=> {
        try {
            const url = "http://localhost:7241/api/Data/blik"
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
    const getBackgroundColor = (()=>{
        let backgroundColor = []
        for(let i = 0; i<7; i++){
            backgroundColor.push('#32CD32');
        }
        for(let i = 0; i<7; i++){
            backgroundColor.push('#FF4500');
        }
        return backgroundColor
    })
    let backgroundColor = getBackgroundColor()
    const barData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: backgroundColor,
                fill: false,
                borderColor: "#ffffff",
                borderWidth: 0.2
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
            <h4>Liczba płatności internetowych zrealizowanych za pomocą usługi BLIK</h4>
            <Line data={barData} options ={options}/>
        </div>

    )
}

export default Home;
