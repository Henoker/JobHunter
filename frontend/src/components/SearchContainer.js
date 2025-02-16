import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import axios from "axios";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const { token, setJobs } = useAuth(); // Access context
  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");
  const [searchType, setSearchType] = useState("all");
  const [sort, setSort] = useState("latest");

  const statusOptions = ["interview", "declined", "pending"];
  const jobTypeOptions = ["full-time", "part-time", "internship"];
  const sortOptions = ["latest", "oldest", "a-z", "z-a"];

  // Handle Search Change
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/jobs/", {
        headers: { Authorization: `Token ${token}` },
        params: {
          search,
          status: searchStatus !== "all" ? searchStatus : "",
          job_type: searchType !== "all" ? searchType : "",
          sort,
        },
      });
      setJobs(response.data); // Update jobs list in context
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    setSearchStatus("all");
    setSearchType("all");
    setSort("latest");
    handleSearch(); // Refresh with default filters
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Search Jobs</h4>
        <div className="form-center">
          {/* Search Field */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={(e) => setSearch(e.target.value)}
          />
          {/* Status Filter */}
          <FormRowSelect
            labelText="Status"
            name="searchStatus"
            value={searchStatus}
            handleChange={(e) => setSearchStatus(e.target.value)}
            list={["all", ...statusOptions]}
          />
          {/* Job Type Filter */}
          <FormRowSelect
            labelText="Job Type"
            name="searchType"
            value={searchType}
            handleChange={(e) => setSearchType(e.target.value)}
            list={["all", ...jobTypeOptions]}
          />
          {/* Sorting */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={(e) => setSort(e.target.value)}
            list={sortOptions}
          />
          {/* Clear Filters */}
          <button className="btn btn-block btn-danger" type="submit">
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
