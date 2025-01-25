declare module "funnel-graph-js" {
  export default class FunnelGraph {
    constructor(config: {
      container: string;
      gradientDirection?: string;
      data: {
        labels: string[];
        subLabels?: string[];
        colors?: string[][];
        values: number[][];
      };
      displayPercent?: boolean;
      direction?: "Horizontal" | "Vertical";
      width?: number;
      height?: number;
      subLabelValue?: string;
    });

    draw(): void;
  }
}
