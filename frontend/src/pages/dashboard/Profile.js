import React, { useState, useEffect } from "react";
import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  // Ensure user data is populated when component loads
  const [first_name, setName] = useState(user?.first_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [last_name, setLastName] = useState(user?.last_name || "");
  const [user_location, setLocation] = useState(user?.user_location || "");

  useEffect(() => {
    setName(user?.first_name || "");
    setEmail(user?.email || "");
    setLastName(user?.last_name || "");
    setLocation(user?.user_location || ""); // Ensure location is set
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    if (!first_name || !email || !last_name || !user_location) {
      setAlert({ type: "danger", message: "All fields are required." });
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUser({
        first_name,
        email,
        last_name,
        user_location,
      });
      setAlert({ type: "success", message: "Profile updated successfully!" });

      // Ensure frontend state is updated with latest user data
      setName(updatedUser.first_name);
      setEmail(updatedUser.email);
      setLastName(updatedUser.last_name);
      setLocation(updatedUser.user_location);
    } catch (error) {
      setAlert({ type: "danger", message: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {alert.message && <Alert type={alert.type} text={alert.message} />}
        <div className="form-center">
          <FormRow
            type="text"
            name="first name"
            value={first_name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="Last Name"
            name="lastName"
            value={last_name}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="Location"
            name="user_location"
            value={user_location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={loading}>
            {loading ? "Please Wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
