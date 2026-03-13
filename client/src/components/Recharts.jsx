import React from "react";
import {
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Bar,
    Cell
} from "recharts";

/**
 * Render one or more responsive bar charts using Recharts.
 *
 * @param {Object[]} charts - Array of chart descriptors to render.
 * @param {string} charts[].title - Chart title displayed above the chart.
 * @param {string} charts[].type - Chart type; this component renders charts when set to `"bar"`.
 * @param {Object[]} charts[].data - Data points for the chart.
 * @param {string} charts[].data[].name - Label for the x-axis for a data point.
 * @param {number} charts[].data[].value - Numeric value for a data point used by the bar height.
 * @returns {JSX.Element|null} A container element with the rendered charts, or `null` if `charts` is falsy or an empty array.
 */
function Recharts({ charts }) {
    if (!charts || charts.length === 0) return null;

    const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

    return (
        <div className="space-y-8">
            {charts.map((chart, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 bg-white w-full"
                >
                    <h4 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">
                        📊 {chart.title}
                    </h4>

                    {/* Scroll container for very small screens */}
                    <div className="w-full overflow-x-auto">

                        {/* Responsive height */}
                        <div className="min-w-[500px] h-[260px] sm:h-[300px] md:h-[340px]">

                            <ResponsiveContainer width="100%" height="100%">
                                {chart.type === "bar" && (
                                    <BarChart
                                        data={chart.data}
                                        margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                                    >
                                        <XAxis
                                            dataKey="name"
                                            interval={0}
                                            angle={-30}
                                            textAnchor="end"
                                            height={70}
                                            tick={{ fontSize: 12 }}
                                        />

                                        <YAxis tick={{ fontSize: 12 }} />

                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "8px",
                                                border: "1px solid #e5e7eb"
                                            }}
                                        />

                                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                            {chart.data.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Bar>

                                    </BarChart>
                                )}
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Recharts;