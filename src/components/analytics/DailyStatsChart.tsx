"use client";
import React from "react";
import { useLocale } from "next-intl";
import CardBox from "../shared/CardBox";
import dynamic from "next/dynamic";
import { formatCurrencyByLocale, formatDateByLocale, formatNumberByLocale } from "@/lib/locale";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DailyStatsChartProps {
  data: {
    date: string;
    sessions: number;
    revenue: number;
    avgDuration: number;
  }[];
  title: string;
  subtitle?: string;
}

const DailyStatsChart: React.FC<DailyStatsChartProps> = ({ data, title, subtitle }) => {
  const locale = useLocale();
  const chartData: any = {
    series: [
      {
        name: "Sessions",
        data: data.map(d => d.sessions),
      },
      {
        name: "Revenue",
        data: data.map(d => d.revenue),
      },
    ],
    chart: {
      type: "area",
      height: 350,
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0.8,
        stops: [100],
      },
    },
    xaxis: {
      categories: data.map(d => {
        const date = new Date(d.date);
        return formatDateByLocale(date, locale, { month: 'short', day: 'numeric' });
      }),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        title: {
          text: "Sessions",
        },
        labels: {
          formatter: (val: number) => Math.round(val).toString(),
        },
      },
      {
        opposite: true,
        title: {
          text: "Revenue (UZS)",
        },
        labels: {
          formatter: (val: number) => formatNumberByLocale(val, locale),
        },
      },
    ],
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      y: {
        formatter: function (val: number, opts: any) {
          if (opts.seriesIndex === 0) {
            return val + " sessions";
          }
          return formatCurrencyByLocale(val, locale);
        },
      },
    },
  };

  return (
    <CardBox>
      <div className="mb-4">
        <h5 className="card-title">{title}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <Chart
        options={chartData}
        series={chartData.series}
        type="area"
        height="350px"
        width="100%"
      />
    </CardBox>
  );
};

export default DailyStatsChart;
