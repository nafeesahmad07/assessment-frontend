import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.raw} views`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        tickBorderDashOffset: 0,
        tickWidth: 0,
      },
    },
    y: {
      grid: {
        display: false,
        tickBorderDashOffset: 0,
        tickWidth: 0,
      },
    },
  },
};

interface iLineChartProps {
  data: any;
  title: string;
  totalViews: number;
  subValue: string;
}

export const LineChart: FC<iLineChartProps> = ({
  data,
  title,
  totalViews,
  subValue,
}) => {
  return (
    <>
      <h2 className="capitalize text-xs font-bold text-primary-default">
        {title}
      </h2>
      <span className="text-2xl font-semibold mb-4 block text-primary-default">
        {totalViews.toLocaleString()}{" "}
        <span className="text-base font-semibold">{subValue}</span>
      </span>
      <Line options={options} data={data} />
    </>
  );
};
