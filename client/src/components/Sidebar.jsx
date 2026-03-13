import React from "react";

function Sidebar({ result }) {

    if (
        !result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long
    ) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">

            <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-indigo-600">📚 Quick Exam View

                </h3>
            </div>
            <section>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                    ⭐ Sub Topics (Priority Wise)
                </p>

                {
                    Object.entries(result.subTopics).map(([star, topics]) => (
                        <div
                            key={star}
                            className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
                        >
                            <p className="text-sm font-semibold text-yellow-600 mb-1">
                                {star} Priority
                            </p>

                            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                                {topics.map((topic, i) => (
                                    <li key={i}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
            </section>

            <section className="round-lg bg-yellow-50 border border-yellow-200 p-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                    🔥Exam Importance
                </p>
                <span className="text-yellow-700 font-bold text-sm">
                    {result.importance}
                </span>

                <p className="text-sm mt-2 font-semibold text-gray-700 mb-3">
                    ❓Important Questions
                </p>

                <div className="mb-4 rounded-lg border border-indigo-200 bg-indigo-100 p-3">
                    <p className="text-sm font-semibold text-indigo-700 mb-1"> Short Questions
                    </p>

                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">

                        {result.questions.short.map((topic, i) => (
                            <li key={i}>{topic}</li>
                        ))}
                    </ul>


                </div>

                <div className="mb-4 rounded-lg border border-purple-200 p-3 bg-purple-100">
                    <p className="text-sm font-semibold text-purple-700 mb-1"> Long Questions
                    </p>

                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">

                        {result.questions.long.map((topic, i) => (
                            <li key={i}>{topic}</li>
                        ))}
                    </ul>


                </div>

                <div className="mb-4 rounded-lg border border-blue-200 p-3 bg-blue-100">
                    <p className="text-sm font-semibold text-blue-700 mb-1"> Diagram
                    </p>

                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">

                        <li>
                            {result.questions.diagram}
                        </li>
                    </ul>


                </div>

            </section>

        </div>
    );
}

export default Sidebar;