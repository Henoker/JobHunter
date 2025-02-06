import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import axios from "axios";

const JobsContainer = () => {
  const { jobs } = useAuth();
  console.log("All Jobs:", jobs);

  return (
    <Wrapper>
      {/* <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>  */}
      {/* <div className="jobs"> */}
      {/* {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })} */}
      {/* <Job /> */}
      {/* </div> */}
      <div>
        <h2>Job Listings</h2>
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id}>
              <h3>
                {job.position} at {job.company}
              </h3>
              <p>{job.status}</p>
              <p>{job.job_location}</p>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
