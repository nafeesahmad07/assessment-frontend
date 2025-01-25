import React, { useState, useEffect, FC } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableItem } from "../reusable-components/dragable/DraggableItem";
import { LineChart } from "../reusable-components/graphs/line-chart/LineChart";
import { Chart } from "../types/types";

const LineChartGroup: FC = () => {
  const initialCharts: Chart[] = [
    {
      id: "chart-1",
      title: "single page views",
      totalViews: 4560,
      subValue: "views",
      gradient: {
        startColor: "#74DFA2",
        endColor: "#0050d3",
      },
      data: {
        labels: [
          "1 Jan",
          "3 Jan",
          "6 Jan",
          "10 Jan",
          "14 Jan",
          "18 Jan",
          "22 Jan",
          "26 Jan",
          "30 Jan",
        ],
        datasets: [
          {
            label: "Dataset 1",
            data: [100, 500, 1000, 4100, 6000, 7200, 10000],
            borderColor: (ctx: any) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "#74DFA2");
              gradient.addColorStop(1, "#0050d3");
              return gradient;
            },
            backgroundColor: "transparent",
            fill: false,
            radius: 0,
            smooth: true,
            pointRadius: 1,
            lineTension: 0.4,
          },
        ],
      },
    },
    {
      id: "chart-2",
      title: "time on page",
      totalViews: 250,
      subValue: "hours",
      gradient: {
        startColor: "#74DFA2",
        endColor: "#0050d3",
      },
      data: {
        labels: [
          "1 Jan",
          "3 Jan",
          "6 Jan",
          "10 Jan",
          "14 Jan",
          "18 Jan",
          "22 Jan",
          "26 Jan",
          "30 Jan",
        ],
        datasets: [
          {
            label: "Dataset 2",
            data: [100, 500, 1000, 4100, 6000, 7200, 10000],
            borderColor: (ctx: any) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "#74DFA2");
              gradient.addColorStop(1, "#0050d3");
              return gradient;
            },
            backgroundColor: "transparent",
            fill: false,
            radius: 0,
            smooth: true,
            pointRadius: 1,
            lineTension: 0.4,
          },
        ],
      },
    },
  ];

  const [charts, setCharts] = useState<Chart[]>(() => {
    const savedCharts = localStorage.getItem("charts");
    if (savedCharts) {
      const parsedCharts = JSON.parse(savedCharts) as Chart[];
      parsedCharts.forEach((chart: any) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx && chart.gradient) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, chart.gradient.startColor);
          gradient.addColorStop(1, chart.gradient.endColor);
          chart.data.datasets[0].borderColor = gradient;
        }
      });
      return parsedCharts;
    }
    return initialCharts;
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = charts.findIndex(
        (chart: Chart) => chart.id === active.id
      );
      const newIndex = charts.findIndex((chart: Chart) => chart.id === over.id);
      const updatedCharts = arrayMove(charts, oldIndex, newIndex);
      setCharts(updatedCharts);
      localStorage.setItem("charts", JSON.stringify(updatedCharts));
    }
  };

  useEffect(() => {
    const chartsWithGradientData = charts.map((chart: any) => ({
      ...chart,
      gradient: {
        startColor: chart.gradient?.startColor || "#74DFA2",
        endColor: chart.gradient?.endColor || "#0050d3",
      },
    }));
    localStorage.setItem("charts", JSON.stringify(chartsWithGradientData));
  }, [charts]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={charts.map((chart: Chart) => chart.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="line-chart-group grid md:grid-cols-2 items-center gap-4">
          {charts.map((chart: Chart) => (
            <DraggableItem key={chart.id} id={chart.id}>
              <LineChart
                data={chart.data}
                title={chart.title}
                totalViews={chart.totalViews}
                subValue={chart.subValue}
              />
            </DraggableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default LineChartGroup;
