import React from 'react'
import { useRef, useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
})


const cleanMermaidChart = (diagram) => {
    if (!diagram) return "";

    let clean = diagram
        // .replace(/<br>/g, "\n")
        // .replace(/\[/g, "")
        // .replace(/\(/g, "")
        // .replace(/\)/g, "")
        // .replace(/\]/g, "")
        // .replace(/:/g, "")
        // .replace(/,/g, "")
        .replace(/<br>/g, "\n")
        .replace(/,/g, "")
        .trim();

    if (!clean.trim().startsWith("graph")) {
        clean = `graph TD\n${clean}`;
    }

    return clean;
};

const autoFixBadNodes = (diagram) => {
    let index = 0;

    return diagram.replace(/\[(.*?)\]/g, (_, label) => {
        index++;
        return `N${index}[${label}]`;
    });
};

/**
 * Renders a sanitized Mermaid diagram into a container and updates it whenever the `diagram` prop changes.
 *
 * The component sanitizes and normalizes the provided Mermaid source, renders it to SVG, and injects the SVG into a scrollable container. If `diagram` is empty or falsy, the container remains empty.
 * @param {Object} props
 * @param {string} props.diagram - Mermaid diagram source text; may be empty or falsy to render no diagram.
 * @returns {JSX.Element} The component's container element that will hold the rendered Mermaid SVG.
 */
function MermaidSetup({ diagram }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!diagram || !containerRef.current) return;

        const renderDiagram = async () => {
            try {
                containerRef.current.innerHTML = "";

                const uniqueId = `mermaid-${Math.random()
                    .toString(36)
                    .substring(2, 9)}`;

                // ✅ sanitize before render
                const safeChart = autoFixBadNodes(cleanMermaidChart(diagram));

                const { svg } = await mermaid.render(uniqueId, safeChart);

                containerRef.current.innerHTML = svg;
            } catch (error) {
                console.error("Mermaid render failed:", error);
            }
        };

        renderDiagram();
    }, [diagram]);

    return (
        <div className="bg-white border rounded-lg p-4 overflow-x-auto">
            <div ref={containerRef}></div>
        </div>
    );
}
export default MermaidSetup