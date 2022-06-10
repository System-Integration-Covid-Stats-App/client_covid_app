import React, {useEffect, useState} from "react";
import axios from "axios";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';

const Home = () => {
    const [dataBeforeCovid, setDataBeforeCovid] = useState([]
    )
    const [dataWhileCovid, setDataWhileCovid] = useState([]
    )
    useEffect((e)=> {
        try {
            const url = "http://localhost:7241/api/data/deathsBeforeCovid"
            axios.get(url)
                .then(res => {
                    setDataBeforeCovid(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    },[]);
    useEffect((e)=> {
        try {
            const url = "http://localhost:7241/api/data/deathsWhileCovid"
            axios.get(url)
                .then(res => {
                    setDataWhileCovid(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    },[]);
    const getBackgroundColor = (()=>{
        let backgroundColor = []
        for(let i = 0; i<27; i++){
            backgroundColor.push('#32CD32');
        }
        for(let i = 0; i<25; i++){
            backgroundColor.push('#FF4500');
        }
        return backgroundColor
    })
    let backgroundColor = getBackgroundColor()
    const barData = {
        labels: Object.keys(dataBeforeCovid).concat(Object.keys(dataWhileCovid)),
        datasets: [
            {
                data:  Object.values(dataBeforeCovid).concat(Object.values(dataWhileCovid)),
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
            <h4>Liczba zgonów</h4>
            <Line data={barData} options ={options}/>
        </div>

    )
}

export default Home;
