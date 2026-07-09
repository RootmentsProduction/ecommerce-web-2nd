"use client";

import React, { useState } from "react";
import { monthlySalesData } from "@/data/admin/dashboard";

export default function SalesAnalyticsChart() {
  const [activeFilter, setActiveFilter] = useState("Month");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart configuration
  const width = 900;
  const height = 280;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Calculate coordinates
  const pointsRevenue: [number, number][] = [];
  const pointsProfit: [number, number][] = [];

  monthlySalesData.forEach((d, i) => {
    const x = paddingLeft + (i * chartWidth) / (monthlySalesData.length - 1);
    
    // Scale: y-axis goes from 0 to 100
    // SVG coordinate system starts at top (0) and goes down
    const yRevenue = paddingTop + chartHeight - (d.revenue * chartHeight) / 100;
    const yProfit = paddingTop + chartHeight - (d.profit * chartHeight) / 100;
    
    pointsRevenue.push([x, yRevenue]);
    pointsProfit.push([x, yProfit]);
  });

  // Smooth Bezier line generator
  const getBezierPath = (points: [number, number][]) => {
    if (points.length === 0) return "";
    return points.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point[0]},${point[1]}`;
      
      const p1 = a[i - 1];
      const p2 = point;
      
      // Control points for smooth curve
      const cp1x = p1[0] + (p2[0] - p1[0]) / 2;
      const cp1y = p1[1];
      const cp2x = p1[0] + (p2[0] - p1[0]) / 2;
      const cp2y = p2[1];
      
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
    }, "");
  };

  const pathRevenue = getBezierPath(pointsRevenue);
  const pathProfit = getBezierPath(pointsProfit);

  // Y-axis grid values
  const yGridValues = [100, 80, 60, 40, 20, 0];

  const highlightRevPt = hoveredIndex !== null ? pointsRevenue[hoveredIndex] : null;
  const highlightProfPt = hoveredIndex !== null ? pointsProfit[hoveredIndex] : null;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100 mb-6">
        <div>
          <h3 className="text-sm font-bold text-neutral-800 tracking-wide font-sans">
            Sales Analytics
          </h3>
          <p className="text-[11px] text-neutral-400 mt-1 font-medium">
            Revenue | Orders | Profit | FY 2026
          </p>
        </div>

        {/* Legend and Filters */}
        <div className="flex flex-wrap items-center gap-6 mt-4 sm:mt-0">
          {/* Legend */}
          <div className="flex items-center space-x-4 text-xs font-semibold text-neutral-500">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C99213] mr-2" />
              Revenue
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] mr-2" />
              Profit
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex bg-[#F8F8F8] p-0.5 rounded-full border border-neutral-200">
            {["Today", "Week", "Month", "Year"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all outline-none cursor-pointer ${
                  activeFilter === filter
                    ? "bg-neutral-800 text-white shadow-sm"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart area */}
      <div className="relative w-full overflow-x-auto no-scrollbar">
        <div className="min-w-[700px] w-full h-[280px]">
          <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
            {/* Y-axis gridlines */}
            {yGridValues.map((value) => {
              const y = paddingTop + chartHeight - (value * chartHeight) / 100;
              return (
                <g key={value} className="opacity-40">
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#E5E5E5"
                    strokeWidth="1.2"
                    strokeDasharray={value === 0 ? "none" : "3,3"}
                  />
                  <text
                    x={paddingLeft - 12}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[10px] font-bold fill-neutral-400 font-sans"
                  >
                    {value === 0 ? "0" : `${value}.K`}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels (months) */}
            {monthlySalesData.map((d, i) => {
              const x = paddingLeft + (i * chartWidth) / (monthlySalesData.length - 1);
              const y = height - paddingBottom + 18;
              return (
                <text
                  key={d.month}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-neutral-400 font-sans"
                >
                  {d.month}
                </text>
              );
            })}

            {/* Revenue Line (Gold) */}
            <path
              d={pathRevenue}
              fill="none"
              stroke="#C99213"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-90"
            />

            {/* Profit Line (Green) */}
            <path
              d={pathProfit}
              fill="none"
              stroke="#15803D"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-90"
            />

            {/* Vertical alignment indicator line (visible only on hover) */}
            {hoveredIndex !== null && highlightRevPt && (
              <line
                x1={highlightRevPt[0]}
                y1={paddingTop}
                x2={highlightRevPt[0]}
                y2={paddingTop + chartHeight}
                stroke="#D4D4D4"
                strokeWidth="1.2"
                strokeDasharray="4,4"
              />
            )}

            {/* Highlighted points (dots with outer glow) - visible only on hover */}
            {hoveredIndex !== null && highlightRevPt && (
              <g>
                <circle
                  cx={highlightRevPt[0]}
                  cy={highlightRevPt[1]}
                  r="7"
                  fill="#C99213"
                  className="opacity-20 animate-ping"
                />
                <circle
                  cx={highlightRevPt[0]}
                  cy={highlightRevPt[1]}
                  r="4.5"
                  fill="#C99213"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="shadow-sm"
                />
              </g>
            )}

            {hoveredIndex !== null && highlightProfPt && (
              <g>
                <circle
                  cx={highlightProfPt[0]}
                  cy={highlightProfPt[1]}
                  r="7"
                  fill="#15803D"
                  className="opacity-20 animate-ping"
                />
                <circle
                  cx={highlightProfPt[0]}
                  cy={highlightProfPt[1]}
                  r="4.5"
                  fill="#15803D"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="shadow-sm"
                />
              </g>
            )}

            {/* Invisible vertical columns to capture cursor hover positions */}
            {monthlySalesData.map((d, i) => {
              const xCenter = paddingLeft + (i * chartWidth) / (monthlySalesData.length - 1);
              const colWidth = chartWidth / (monthlySalesData.length - 1);
              const rectX = xCenter - colWidth / 2;

              return (
                <rect
                  key={i}
                  x={rectX}
                  y={paddingTop}
                  width={colWidth}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
