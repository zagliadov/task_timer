import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { zero } from '../../../../features/utils/utils';
import { useSelector } from 'react-redux';


const Diagram = ({ tasks, start }) => {

    const [chartData, setChartData] = useState({});
    let [timer, setTimer] = useState([]);
    const user = useSelector(state => state.user.user);


    useEffect(() => {
        if (!tasks) return
        chart();
    }, [user, tasks, start]);

    const chart = () => {
        let memo = [],
            colors = [
                '#5bc776',
                '#3aa59c',
                '#20a06f',
                '#7770b8',
                '#52bfd3',
                '#5c7dbb',
                '#cc5454',
                '#c8c04e',
                '#4fb379'
            ],
            time = [];
        /**
         * Перебираем tasks разделяя memo и time
         * zero добавляет '0' если значение меньше 10
         */
        for (let i = 0; i < tasks.length; ++i) {
            memo.push(tasks[i].memo)
            time.push({ hours: zero(tasks[i].hours), minutes: zero(tasks[i].minutes), seconds: zero(tasks[i].seconds) });
        }
        /**
         * Если time не собран выходим
         * Иначе перебираем time и заполняем массив Timer собраными данными
         */
        let arr = time.map(t => t.hours.concat(t.minutes, t.seconds));
        setTimer(arr);
        // Заполняем chartData для диаграммы
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

    return (
        <div>

            <Doughnut
                data={chartData}
                height={200}
                width={400}
                options={{
                    maintainAspectRatio: false,
                }}
            />

        </div>
    );
};

export default Diagram;



