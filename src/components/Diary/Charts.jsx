import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

const Charts = ({ aiSummary }) => {
  // const data = [
  //   { title: "Maldives", mood: 7, sentiment: 4 },
  //   { title: "Seattle", mood: 9, sentiment: 3 },
  //   { title: "London", mood: 8, sentiment: 6 },
  //   { title: "Paris", mood: 4, sentiment: 2 },
  //   { title: "Dubai", mood: 5, sentiment: 1 },
  //   { title: "Los Angeles", mood: 9, sentiment: 8 },
  // ];

  // if (aiSummary.length == 0) return;
  const data = aiSummary;
  return (
    <div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 15, right: 5, left: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="Mood/Sentiment" fill="#82ca9d" /> */}
            <Bar dataKey="mood" name="Mood" fill="#8884d8" />
            <Bar dataKey="sentiment" name="Sentiment" fill="#ff6b6b" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Charts go here</p>
      )}
    </div>
  );
};
// const data = aiSummary;
//   const chartRef = useRef(null);
//   const _width = 495;
//   const _height = 400;

//   useEffect(() => {
//     const svg = d3.select(chartRef.current);
//     svg.selectAll("*").remove(); // Clear previous chart

//     const margin = { top: 10, right: 10, bottom: 20, left: 20 };
//     const width = _width - margin.left - margin.right;
//     const height = _height - margin.top - margin.bottom;

//     // Function to truncate strings longer than 8 characters
//     const truncateString = (str) => (str.length > 8 ? str.substring(0, 8) : str);

//     // Process data to truncate titles
//     const processedData = data.map((d) => ({
//       ...d,
//       title: truncateString(d.title),
//     }));

//     // Calculate dynamic padding based on the number of data points
//     const dynamicPadding = Math.min(0.5, 1 / processedData.length);

//     const x = d3
//       .scaleBand()
//       .domain(processedData.map((d) => d.title))
//       .range([0, width])
//       .padding(dynamicPadding);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(processedData, (d) => d.moodSentiment)])
//       .nice()
//       .range([height, 0]);

//     const svgContent = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

//     svgContent
//       .append("g")
//       .selectAll(".bar")
//       .data(processedData)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", (d) => x(d.title))
//       .attr("y", (d) => y(d.moodSentiment))
//       .attr("width", x.bandwidth())
//       .attr("height", (d) => height - y(d.moodSentiment))
//       .attr("fill", "#8884d8");

//     svgContent.append("g").attr("class", "x-axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

//     svgContent.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
//   }, [data]);

//   return <svg ref={chartRef} width={_width} height={_height}></svg>;
// };

export default Charts;
