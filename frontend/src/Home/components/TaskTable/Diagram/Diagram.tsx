import { useState, useEffect, FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { zero } from "../../../../features/utils/utils";
import { useAppSelector } from "../../../../features/store";
import { RootState } from "../../../../features/store";

interface ITasks {
  firstname: string;
  memo: string;
  userId: number;
  id: number;
  createdAt: string;
  hours: string;
  minutes: string;
  seconds: string;
}
type IArr = [ITasks] | [];
type IDiagramProps = {
  tasks: IArr;
  start: boolean;
};

type IChartData = {
  labels?: string[];
  datasets?: [
    {
      label: string;
      data: string[];
      backgroundColor: string[];
    }
  ];
};

const Diagram: FC<IDiagramProps | any> = ({ tasks, start }) => {
  const [chartData, setChartData] = useState<IChartData | any>({});
  let [timer, setTimer] = useState<string[] | any>([]);
  const user = useAppSelector((state: RootState) => state.user.user);



  return (
    <div>
    
    </div>
  );
};
export default Diagram;
