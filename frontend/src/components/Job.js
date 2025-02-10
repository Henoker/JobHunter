import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Job = ({
  id,
  position,
  company,
  job_location,
  job_type,
  created_at,
  status,
  onDelete, // Function to update job list after delete
}) => {
  const date = moment(created_at).format("MMM Do, YYYY");
  const { token } = useAuth(); // Get token from context
  const navigate = useNavigate();

  // ✅ Handle Job Deletion
  // const handleDelete = async () => {
  //   console.log("Token before delete request:", token); // Debugging
  //   try {
  //     await axios.delete(`http://localhost:8000/api/v1/jobs/${id}/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     onDelete(id);
  //   } catch (error) {
  //     console.error("Error deleting job:", error.response || error);
  //   }
  // };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/jobs/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        onDelete(id); // Call the onDelete function to update the job list
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0).toUpperCase()}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={job_location} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={job_type} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to={`/edit-job/${id}`} className="btn edit-btn">
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
