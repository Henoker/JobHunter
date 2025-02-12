import { useEffect, useState } from "react";
import ChartsContainer from "../../components/ChartsContainer";
import Loading from "../../components/Loading";
import StatsContainer from "../../components/StatsContainer";
import { useAuth } from "../../context/AuthContext";

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const { jobStats } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {jobStats?.total_jobs > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
