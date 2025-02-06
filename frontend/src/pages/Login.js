import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
    try {
      // Call the login function with the form data
      await login({ email, password });
      // If login is successful, navigate to the home page or wherever appropriate
      setAlert({ type: "success", message: "successfully logged in" });
      navigate("/");
    } catch (err) {
      // Handle any errors returned by the login function
      setAlert({ type: "danger", message: "An error occurred during login." });
      // setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        <Alert type={alert.type} text={alert.message} />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          labelText="Password"
        />
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Submitting" : "Submit"}
        </button>
        <p>
          Not a member yet?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
        <p>
          <Link to="/reset-password">Forget Password ?</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
