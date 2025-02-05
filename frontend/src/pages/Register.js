import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false); // Loading state
  const { register } = useAuth(); // Use the register function from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    if (formData.password !== formData.re_password) {
      setAlert({ type: "danger", message: "Passwords do not match." });
      return;
    }

    setLoading(true); // Start loading
    const response = await register(formData);
    setLoading(false); // Stop loading after response

    if (response.success) {
      setAlert({ type: "success", message: response.message });
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } else {
      setAlert({ type: "danger", message: response.message });
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Register</h3>
        <Alert type={alert.type} text={alert.message} />
        <FormRow
          type="text"
          name="first_name"
          value={formData.first_name}
          handleChange={handleChange}
          labelText="First Name"
        />
        <FormRow
          type="text"
          name="last_name"
          value={formData.last_name}
          handleChange={handleChange}
          labelText="Last Name"
        />
        <FormRow
          type="email"
          name="email"
          value={formData.email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
          labelText="Password"
        />
        <FormRow
          type="password"
          name="re_password"
          value={formData.re_password}
          handleChange={handleChange}
          labelText="Retype Password"
        />
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Submitting" : "Submit"}
        </button>
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
