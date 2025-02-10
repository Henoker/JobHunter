import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Ensure AuthContext provides jobs and setJobs
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import axios from "axios";

const JobsContainer = () => {
  // Use jobs and setJobs from the AuthContext
  const { jobs, setJobs, token } = useAuth();

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/jobs/", {
          headers: { Authorization: `Token ${token}` },
        });
        setJobs(response.data); // Update the global jobs state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [token, setJobs]); // Add setJobs to dependency array
  console.log("Token in Job component:", token);
  // Function to handle job deletion
  const handleDeleteJob = async (jobId) => {
    console.log("Deleting job with ID:", jobId);
    try {
      await axios.delete(`http://localhost:8000/api/v1/jobs/${jobId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // Remove deleted job
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Wrapper>
      <h5>
        {jobs.length} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job.id} id={job.id} {...job} onDelete={handleDeleteJob} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
