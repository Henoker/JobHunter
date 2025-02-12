import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAuth } from "../context/AuthContext";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { jobStats } = useAuth(); // Get stats from AuthContext

  const data = jobStats?.monthlyApplications || []; // Handle missing data safely

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {data.length > 0 ? (
        barChart ? (
          <BarChart data={data} />
        ) : (
          <AreaChart data={data} />
        )
      ) : (
        <p>No data available</p>
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
