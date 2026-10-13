"use client";
import React from "react";
import { useLocale } from "next-intl";
import CardBox from "../shared/CardBox";
import dynamic from "next/dynamic";
import { formatCurrencyByLocale } from "@/lib/locale";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TopSellingItemsChartProps {
  data: {
    itemName: string;
    totalQuantity: number;
    totalRevenue: number;
    orderCount: number;
  }[];
  title: string;
  subtitle?: string;
}

const TopSellingItemsChart: React.FC<TopSellingItemsChartProps> = ({ data, title, subtitle }) => {
  const locale = useLocale();
  const chartData: any = {
    series: [
      {
        name: "Revenue",
        data: data.map(d => d.totalRevenue),
      },
      {
        name: "Quantity Sold",
        data: data.map(d => d.totalQuantity),
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.map(d => d.itemName),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Revenue (UZS)",
        },
        labels: {
          formatter: (val: number) => formatCurrencyByLocale(val, locale),
        },
      },
      {
        opposite: true,
        title: {
          text: "Quantity",
        },
        labels: {
          formatter: (val: number) => Math.round(val).toString(),
        },
      },
    ],
    fill: {
      opacity: 1,
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
        formatter: function (val: number, opts: any) {
          const itemIndex = opts.dataPointIndex;
          const itemData = data[itemIndex];

          if (opts.seriesIndex === 0) {
            return `${formatCurrencyByLocale(val, locale)} (${itemData.orderCount} orders)`;
          }
          return `${val} units sold`;
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
        type="bar"
        height="350px"
        width="100%"
      />
    </CardBox>
  );
};

export default TopSellingItemsChart;
