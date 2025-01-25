import React, { FC, useEffect } from "react";
import funnelGraph from "funnel-graph-js";
import { iFunnelChart } from "../../../types/types";
import { useElementWidth } from "../../../../hooks/useScreenWidth";

import "./funnelGraph.scss";

interface FunnelGraphProps {
  containerId: string;
  data: iFunnelChart;
}

const FunnelGraph: FC<FunnelGraphProps> = ({ containerId, data }) => {
  const getFunnelWidth = useElementWidth("funnel-graph");

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = "";

    const graph = new funnelGraph({
      container: `#${containerId}`,
      gradientDirection: "horizontal",
      data: data,
      displayPercent: false,
      direction: "Horizontal",
      width: getFunnelWidth,
      height: 350,
      subLabelValue: "values",
    });

    graph.draw();

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [containerId, data, getFunnelWidth]);

  return <div id={containerId} className="funnel-wrapper" />;
};

export default FunnelGraph;
