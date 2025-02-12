import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import StatsItem from "./StatsItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/JobsContainer";

const StatsContainer = () => {
  const { jobStats } = useAuth(); // Get stats from context
  console.log(jobStats);
  useEffect(() => {
    console.log("Updated jobStats in StatsContainer:", jobStats);
  }, [jobStats]);
  const defaultStats = [
    {
      title: "Pending Applications",
      count: jobStats.pending_jobs || 0, // Use correct key
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Interviews Scheduled",
      count: jobStats.interview_jobs || 0, // Use correct key
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Jobs Declined",
      count: jobStats.declined_jobs || 0, // Use correct key
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => (
        <StatsItem key={index} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
