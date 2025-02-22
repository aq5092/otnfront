import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { URL_USERS } from "../Path";
const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [jarayon, setJarayon] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "tasks/", {
        "Content-Type": "application/json",
      })
      .then((response) => {
        // console.log(response.data)
        const jar = response.data.filter((i) => i.status === "Jarayonda");
        console.log(jar);
        setChartData(response.data);
        setJarayon(jar);
        // const data = response.data.turi.map((label, index) => ({
        //   name: label,
        //   value: response.data.xodim_soni[index]
        // }));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

// Count the occurrences of each status
const statusCounts = chartData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
}, {});

// Convert the counts to an array of objects for the chart
const chartDataWithCounts = Object.keys(statusCounts).map((key) => ({
    status: key,
    count: statusCounts[key],
}));

return (
    <div>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartDataWithCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        <div>
            {jarayon.length > 0 ? (
                <div>
                    <h1>Jarayon</h1>
                    <ul>
                        {jarayon.map((item, index) => (
                            <li key={index}>
                                <p>{item.turi}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    </div>
);
};

export default ChartComponent;
