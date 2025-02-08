import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAuth } from "../../context/AuthContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const jobTypeOptions = ["full-time", "part-time", "remote", "internship"];
const statusOptions = ["pending", "interview", "declined"];

const AddJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate(); // Redirect after editing
  const { updateJobsList } = useAuth();
  const [job, setJob] = useState({
    company: "",
    position: "",
    job_location: "",
    job_type: "full-time",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // ✅ Use null for better re-rendering

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/v1/jobs/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response) => setJob(response.data))
        .catch((error) => console.error("Error fetching job:", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      let response;
      const jobData = {
        company: job.company,
        position: job.position,
        job_location: job.job_location,
        job_type: job.job_type,
        status: job.status,
      };

      if (id) {
        response = await axios.put(
          `http://localhost:8000/api/v1/jobs/${id}/`,
          jobData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:8000/api/v1/jobs/`,
          jobData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      setAlert({
        type: "success",
        message: `Job ${id ? "updated" : "created"} successfully!`,
      });

      updateJobsList(response.data); // ✅ Call the function to update the job list

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error saving job:", error.response?.data || error.message);
      setAlert({
        type: "error",
        message: error.response?.data?.detail || "Failed to save job.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h2>{id ? "Edit Job" : "Add Job"}</h2>
        {alert && <Alert type={alert.type} text={alert.message} />}{" "}
        {/* ✅ Fix alert rendering */}
        <div className="form-center">
          <FormRow
            type="text"
            name="company"
            labelText="Company"
            value={job.company}
            handleChange={(e) => setJob({ ...job, company: e.target.value })}
          />
          <FormRow
            type="text"
            name="position"
            labelText="Position"
            value={job.position}
            handleChange={(e) => setJob({ ...job, position: e.target.value })}
          />
          <FormRow
            type="text"
            name="job_location"
            labelText="Location"
            value={job.job_location}
            handleChange={(e) =>
              setJob({ ...job, job_location: e.target.value })
            }
          />
          <FormRowSelect
            name="job_type"
            labelText="Job Type"
            value={job.job_type}
            handleChange={(e) => setJob({ ...job, job_type: e.target.value })}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name="status"
            labelText="Status"
            value={job.status}
            handleChange={(e) => setJob({ ...job, status: e.target.value })}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update Job" : "Create Job"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
