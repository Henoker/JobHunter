import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo, Alert } from "../components";
import React from "react";
import { useAuth } from "../context/AuthContext";

const ResetPasswordConfirm = () => {
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const { token } = useParams();

  const { passwordResetConfirm } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    const response = await passwordResetConfirm(token, formData.password);
    setAlert({
      type: response.success ? "success" : "danger",
      message: response.message,
    });

    if (response.success) {
      setTimeout(() => navigate("/login"), 3000); // Redirect after success
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Enter New Password</h3>
        <Alert type={alert.type} text={alert.message} />
        <FormRow
          type="password"
          name="new_password"
          value={formData.password}
          handleChange={handleChange}
          labelText="New Password"
        />
        <button type="submit" className="btn btn-block">
          Reset Password
        </button>
      </form>
    </Wrapper>
  );
};

export default ResetPasswordConfirm;
