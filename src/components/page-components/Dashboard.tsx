import React, { useEffect, useState } from "react";
import Button from "../core-components/Button";
import { DEFAULT_SIZES, COLOR_VARIANT } from "../../constants/commonContant";
import FunnelGraph from "../reusable-components/graphs/funnel-graph/FunnelGraph";
import LineChartGroup from "./Charts";
import { iFunnelChart } from "../types/types";

const Dashboard = () => {
  const localStorageData = localStorage.getItem("funnelChart");
  const [activeButtonId, setActiveButtonId] = useState<number>(1);
  const [selectedData, setSelectedData] = useState<iFunnelChart>();

  const buttonsGroup = [
    { id: 1, label: "1 Month" },
    { id: 2, label: "3 Months" },
    { id: 3, label: "6 Months" },
    { id: 4, label: "12 Months" },
    { id: 5, label: "Custom" },
  ];

  const funnelDataByMonths: Record<number, iFunnelChart> = {
    1: {
      values: [[34560], [4560], [540]],
      labels: ["total page views", "single page views", "leads"],
      colors: [["#0050d3", "#6ad3b8"]],
    },
    2: {
      labels: ["total page views", "single page views", "leads"],
      colors: [["#ff5733", "#ffc300"]],
      values: [[650], [300], [70]],
    },
    3: {
      labels: ["total page views", "single page views", "leads"],
      colors: [["#28a745", "#17a2b8"]],
      values: [[500], [350], [150]],
    },
    4: {
      labels: ["total page views", "single page views", "leads"],
      colors: [["#2dd4bf", "#006FEE"]],
      values: [[1000], [700], [270]],
    },
    5: {
      labels: ["total page views", "single page views", "leads"],
      colors: [["#28a745", "#17a2b8"]],
      values: [[3500], [1100], [350]],
    },
  };

  const handleButtonClick = (id: number) => {
    setActiveButtonId(id);
    setSelectedData(funnelDataByMonths[id]);
    localStorage.setItem(
      "funnelChart",
      JSON.stringify({
        funnelData: funnelDataByMonths[id],
        btnId: id,
      })
    );
  };

  useEffect(() => {
    if (localStorageData) {
      setSelectedData(JSON.parse(localStorageData).funnelData);
      setActiveButtonId(JSON.parse(localStorageData).btnId);
    } else {
      setSelectedData(funnelDataByMonths[1]);
    }
  }, [localStorageData]);

  return (
    <>
      <h1 className="text-primary-default text-4xl mb-6 lg:text-5xl font-bold lg:mb-8">
        Dashboard
      </h1>
      <div className="btn-group flex gap-1 lg:gap-3 mb-6 lg:mb-9 overflow-x-auto">
        {buttonsGroup.map((button) => (
          <Button
            key={button.id}
            variant={
              activeButtonId === button.id
                ? COLOR_VARIANT.PRIMARY
                : COLOR_VARIANT.DEFAULT
            }
            size={DEFAULT_SIZES.SMALL}
            type="button"
            onClick={() => handleButtonClick(button.id)}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <div className="funnel-graph border border-default-70 rounded-xl lg:py-7 mb-6">
        {selectedData && (
          <FunnelGraph
            containerId="dashboard-funnel-graph"
            data={selectedData}
          />
        )}
      </div>
      <LineChartGroup />
    </>
  );
};

export default Dashboard;
