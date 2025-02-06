import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import axios from "axios";

const JobsContainer = () => {
  const { jobs } = useAuth();

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
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                {job.position} at {job.company} ({job.status})
              </li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
