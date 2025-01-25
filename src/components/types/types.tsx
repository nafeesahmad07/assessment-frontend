export interface Chart {
  id: string;
  title: string;
  totalViews: number;
  subValue: string;
  gradient?: {
    startColor: string;
    endColor: string;
  };
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: any;
      backgroundColor: string;
      fill: boolean;
      radius: number;
      smooth: boolean;
      pointRadius: number;
      lineTension: number;
    }[];
  };
}

export interface iFunnelChart {
  labels: string[];
  subLabels?: string[];
  colors: string[][];
  values: number[][];
}
