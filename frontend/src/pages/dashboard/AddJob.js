import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAuth } from "../../context/AuthContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import axios from "axios";

const jobTypeOptions = ["full-time", "part-time", "remote", "internship"];
const statusOptions = ["pending", "interview", "declined"];

const AddJob = ({ selectedJob, clearEdit }) => {
  const { user, token } = useAuth(); // Get user & token from context

  // ✅ State for job fields
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [status, setStatus] = useState("pending");
  const [jobType, setJobType] = useState("full-time");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  // ✅ Load job data if editing
  useEffect(() => {
    if (selectedJob) {
      setPosition(selectedJob.position);
      setCompany(selectedJob.company);
      setJobLocation(selectedJob.jobLocation);
      setStatus(selectedJob.status);
      setJobType(selectedJob.jobType);
      setIsEditing(true);
    } else {
      clearValues();
    }
  }, [selectedJob]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "position") setPosition(value);
    if (name === "company") setCompany(value);
    if (name === "jobLocation") setJobLocation(value);
    if (name === "status") setStatus(value);
    if (name === "jobType") setJobType(value);
  };

  // ✅ Submit form (Create or Update Job)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      setAlert({ type: "error", message: "Please fill all fields" });
      return;
    }

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Token ${token}` } };

      if (isEditing) {
        // Update existing job
        await axios.put(
          `http://localhost:8000/api/v1/jobs/${selectedJob.id}/`,
          {
            position,
            company,
            jobLocation,
            status,
            jobType,
          },
          config
        );
        setAlert({ type: "success", message: "Job updated successfully" });
      } else {
        // Create new job
        await axios.post(
          "http://localhost:8000/api/v1/jobs/",
          {
            position,
            company,
            jobLocation,
            status,
            jobType,
          },
          config
        );
        setAlert({ type: "success", message: "Job added successfully" });
      }

      clearValues();
    } catch (error) {
      setAlert({ type: "error", message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete job
  const handleDelete = async () => {
    if (!isEditing) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Token ${token}` } };
      await axios.delete(
        `http://localhost:8000/api/v1/jobs/${selectedJob.id}/`,
        config
      );
      setAlert({ type: "success", message: "Job deleted successfully" });
      clearValues();
    } catch (error) {
      setAlert({ type: "error", message: "Failed to delete job" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Clear form values
  const clearValues = () => {
    setPosition("");
    setCompany("");
    setJobLocation("");
    setStatus("pending");
    setJobType("full-time");
    setIsEditing(false);
    setAlert({ type: "", message: "" });
    if (clearEdit) clearEdit(); // Call parent function to clear selectedJob
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        {alert.message && <Alert type={alert.type} text={alert.message} />}

        <div className="form-center">
          {/* Position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />

          {/* Company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />

          {/* Job Location */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChange}
          />

          {/* Job Status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleChange}
            list={statusOptions}
          />

          {/* Job Type */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleChange}
            list={jobTypeOptions}
          />

          {/* Buttons */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : isEditing ? "Update Job" : "Submit"}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-block delete-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Processing..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
