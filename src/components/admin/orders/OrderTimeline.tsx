import React from "react";
import { OrderTimelineEvent } from "@/types/admin";

interface OrderTimelineProps {
  timeline: OrderTimelineEvent[];
}

export default function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3 font-sans">
        Order Progression Timeline
      </h2>

      <div className="flow-root pl-1">
        <ul className="-mb-8">
          {timeline.map((event, idx) => {
            const isCompleted = event.status === "completed";
            const isCurrent = event.status === "current";

            return (
              <li key={idx}>
                <div className="relative pb-8">
                  {/* Vertical bar connectors */}
                  {idx !== timeline.length - 1 && (
                    <span
                      className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                        isCompleted ? "bg-[#C99213]" : "bg-neutral-200"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  
                  <div className="relative flex space-x-3 items-start">
                    {/* Circle icon */}
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${
                          isCompleted
                            ? "bg-[#C99213] text-white"
                            : isCurrent
                            ? "bg-amber-100 border border-[#C99213] text-[#C99213]"
                            : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        {isCompleted ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="w-1.5 h-1.5 bg-current rounded-full" />
                        )}
                      </span>
                    </div>

                    {/* Description info */}
                    <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4 text-xs">
                      <div>
                        <p className={`font-semibold ${
                          isCompleted ? "text-neutral-800" : isCurrent ? "text-neutral-900 font-bold" : "text-neutral-400"
                        }`}>
                          {event.title}
                        </p>
                        <p className="text-[10px] text-neutral-450 mt-0.5 font-normal">
                          {event.description}
                        </p>
                      </div>
                      {event.date && (
                        <div className="text-right whitespace-nowrap text-[10px] font-semibold text-neutral-400">
                          {event.date}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
