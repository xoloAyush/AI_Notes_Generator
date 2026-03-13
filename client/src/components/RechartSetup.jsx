import React from "react";
import { BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar } from "recharts";

/**
 * Render one or more Recharts charts from an array of chart descriptors.
 *
 * @param {{charts: Array<{type: "bar" | "line" | "pie", title: string, data: Array<{name: string, value: number}>}>}} props
 *   props.charts - An array of chart descriptor objects. Each descriptor must include:
 *     - type: The chart type to render; one of "bar", "line", or "pie".
 *     - title: A string title displayed above the chart.
 *     - data: An array of data points for the chart where each point has a `name` and a numeric `value`.
 * @returns {JSX.Element|null} A React element containing the rendered charts, or `null` when `charts` is empty or not provided.
 */
function RechartSetup({ charts }) {
    if (!charts || charts.length === 0) return null;

    const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

    return (
        <div className="space-y-8">
            {charts.map((chart, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 bg-white"
                >
                    <h4 className="font-semibold text-gray-800 mb-3">
                        📊 {chart.title}
                    </h4>

                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            {chart.type === "bar" && (
                                <BarChart data={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} >
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            )}

                            {chart.type === "line" && (
                                <LineChart data={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                    >
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Line>
                                </LineChart>
                            )}

                            {chart.type === "pie" && (
                                <PieChart>
                                    <Tooltip />
                                    <Pie
                                        data={chart.data}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        fill="#6366f1"
                                        label
                                    >
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RechartSetup;