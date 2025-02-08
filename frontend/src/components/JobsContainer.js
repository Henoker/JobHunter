import React from "react";
import { useAuth } from "../context/AuthContext"; // Ensure AuthContext provides setJobs
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
  const { jobs, setJobs } = useAuth(); // ✅ Include setJobs from context

  const removeJobFromList = (id) => {
    setJobs(jobs.filter((job) => job.id !== id)); // ✅ Remove deleted job
  };

  return (
    <Wrapper>
      <h5>
        {jobs.length} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job.id} id={job.id} {...job} onDelete={removeJobFromList} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
