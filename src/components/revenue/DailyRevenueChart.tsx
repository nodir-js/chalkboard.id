"use client";
import React from "react";
import { useLocale } from "next-intl";
import CardBox from "../shared/CardBox";
import dynamic from "next/dynamic";
import { formatCurrencyByLocale, formatDateByLocale } from "@/lib/locale";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DailyRevenueChartProps {
  data: {
    date: string;
    tableRevenue: number;
    fnbRevenue: number;
    totalRevenue: number;
  }[];
  title: string;
  subtitle?: string;
}

const DailyRevenueChart: React.FC<DailyRevenueChartProps> = ({ data, title, subtitle }) => {
  const locale = useLocale();
  const chartData: any = {
    series: [
      {
        name: "Table Revenue",
        data: data.map(d => d.tableRevenue),
      },
      {
        name: "F&B Revenue",
        data: data.map(d => d.fnbRevenue),
      },
      {
        name: "Total Revenue",
        data: data.map(d => d.totalRevenue),
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
      stacked: false,
    },
    colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)"],
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
        opacityTo: 0.1,
        stops: [20, 100],
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
    yaxis: {
      title: {
        text: "Revenue (UZS)",
      },
      labels: {
        formatter: (val: number) => formatCurrencyByLocale(val, locale),
      },
    },
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
        formatter: function (val: number) {
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

export default DailyRevenueChart;
