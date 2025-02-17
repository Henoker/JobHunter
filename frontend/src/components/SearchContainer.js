import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";

let timeoutId; // Declare timeout ID globally

const SearchContainer = () => {
  const { token, setJobs } = useAuth(); // Access AuthContext
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // New state for debounced search
  const [searchStatus, setSearchStatus] = useState("all");
  const [searchType, setSearchType] = useState("all");
  const [sort, setSort] = useState("latest");

  const statusOptions = ["interview", "declined", "pending"];
  const jobTypeOptions = ["full-time", "part-time", "internship"];
  const sortOptions = ["latest", "oldest", "a-z", "z-a"];

  // Debounce search input
  useEffect(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDebouncedSearch(search); // Update debounced search state after delay
    }, 500); // Wait 500ms before applying search

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [search]);

  // Fetch filtered jobs when filters change
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/jobs/", {
          headers: { Authorization: `Token ${token}` },
          params: {
            search: debouncedSearch || undefined, // Avoid empty search params
            status: searchStatus !== "all" ? searchStatus : undefined,
            job_type: searchType !== "all" ? searchType : undefined,
            sort,
          },
        });
        setJobs(response.data); // Update jobs list globally
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
      }
    };

    fetchFilteredJobs();
  }, [debouncedSearch, searchStatus, searchType, sort, token, setJobs]); // Runs when debounced search or filters change

  // Reset Filters
  const handleClearFilters = (e) => {
    e.preventDefault();
    setSearch("");
    setSearchStatus("all");
    setSearchType("all");
    setSort("latest");
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Jobs</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={(e) => setSearch(e.target.value)} // Update search immediately
          />
          <FormRowSelect
            labelText="Status"
            name="searchStatus"
            value={searchStatus}
            handleChange={(e) => setSearchStatus(e.target.value)}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="Job Type"
            name="searchType"
            value={searchType}
            handleChange={(e) => setSearchType(e.target.value)}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={(e) => setSort(e.target.value)}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
