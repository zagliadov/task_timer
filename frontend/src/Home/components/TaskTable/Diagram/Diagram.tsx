import { useState, useEffect, FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { zero } from '../../../../features/utils/utils';
import { useAppSelector } from '../../../../features/store';
import { RootState } from '../../../../features/store';

interface ITasks {
    firstname: string,
    memo: string,
    userId: number,
    id: number,
    createdAt: string,
    hours: string,
    minutes: string,
    seconds: string,
}
type IArr = [ITasks] | []
type IDiagramProps = {
    tasks: IArr,
    start: boolean,
}

type IChartData = {
    labels?: string[],
    datasets?: [
        {
            label: string,
            data: string[],
            backgroundColor: string[],
        }
    ]
}



const Diagram: FC<IDiagramProps> = ({ tasks, start }) => {

    const [chartData, setChartData] = useState<IChartData>({});
    let [timer, setTimer] = useState<string[]>([]);
    const user = useAppSelector((state: RootState) => state.user.user);
    /**
     * React Hook useEffect has a complex expression in the dependency array. 
     * Extract it to a separate variable so it can be statically 
     * checked  react-hooks/exhaustive-deps/
     */
    let exdep: boolean = !start;
    useEffect(() => {
        if (!tasks) return
        chart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, tasks, start, exdep]);

    type ITime = {
        hours: string,
        minutes: string,
        seconds: string,
    }
    const chart = (): void => {
        let memo: string[] = [],
            colors: string[] = [
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
            time: ITime[] = [];
        /**
         * Перебираем tasks разделяя memo и time
         * zero добавляет '0' если значение меньше 10
         */
        for (let i: number = 0; i < tasks.length; ++i) {
            memo.push(tasks[i].memo);
            time.push({ hours: zero(tasks[i].hours), minutes: zero(tasks[i].minutes), seconds: zero(tasks[i].seconds) });
        }
        /**
         * Если time не собран выходим
         * Иначе перебираем time и заполняем массив Timer собраными данными
         */
        // type IArr = [string]
        let arr: string[] = time.map((t: ITime) => t.hours.concat(t.minutes, t.seconds));
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
                height={220}
                width={400}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    );
};

export default Diagram;



