import { useEffect, useState } from "react";
import ChartsContainer from "../../components/ChartsContainer";
import Loading from "../../components/Loading";
import StatsContainer from "../../components/StatsContainer";
// import { useAppContext } from "../../context/appContext";

const Stats = () => {
  // const { showStats, isLoading, monthlyApplications } = useAppContext();
  const [loading, setLoading] = useState(false);
  const monthlyApplications = 0;

  useEffect(() => {
    // showStats();
    // eslint-disable-next-line
  }, []);
  if (setLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
