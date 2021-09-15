import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import * as moment from 'moment'
const Diagram = ({ tasks }) => {

    const [chartData, setChartData] = useState({});
    // const [memo, setMemo] = useState([]);
    // const [minutes, setMinutes] = useState([]);
    // const [seconds, setSeconds] = useState([]);
    // const [hours, setHours] = useState([]);
    const [timer, setTimer] = useState([])
    let zero = (item) => {
        if (item < 10) return '0' + item
        return item
    }
    const chart = () => {
        let memo = [],
            colors = [
                '#20a06f',
                '#00ffea',
                '#4cfd78',
                '#db42c7',
                '#f80b82',
                '#ffbb00',
                '#f54949',
                '#f6e92d',
                '##0ed461'
            ],

            time = [];
        for (let i = 0; i < tasks.length; ++i) {
            memo.push(tasks[i].memo)
            time.push({ memo: tasks[i].memo, hours: zero(tasks[i].hours), minutes: zero(tasks[i].minutes), seconds: zero(tasks[i].seconds) })
        }
        if(!time) return
        time.map(tim => setTimer(timer.push(tim.hours.concat(tim.minutes, tim.seconds))))
        setChartData({
            labels: memo,
            datasets: [
                {
                    label: 'let',
                    data: timer,
                    backgroundColor: colors,
                }

            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])


    return (
        <div>

            {tasks &&
                <Doughnut
                    data={chartData}
                    height={200}
                    width={400}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            }



        </div>
    );
};

export default Diagram;




{/* <Doughnut
    data={{
        labels: [
            'Red',
            'Green',
            'Yellow',
            'blue',
            'Purple',
            'Orange',
        ],
        datasets: [
            {
                label: '# of votes',
                data: [12, 18, 3, 5, 2, 1]
            }
        ]
    }}
    height={200}
    width={400}
    options={{
        maintainAspectRatio: false,
    }}
/> */}