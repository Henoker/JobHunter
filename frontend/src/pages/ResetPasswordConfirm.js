import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo, Alert } from "../components";
import React from "react";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      uid,
      token,
      new_password,
      re_new_password,
    };
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Register</h3>
        <Alert />
        <FormRow
          type="password"
          name="new_password"
          value={new_password}
          handleChange={handleChange}
          labelText="Password"
        />
        <FormRow
          type="password"
          name="re_new_password"
          value={re_new_password}
          handleChange={handleChange}
          labelText="Confirm Password"
        />
        <button type="submit" className="btn btn-block" disabled>
          Reset Password
        </button>
      </form>
    </Wrapper>
  );
};

export default ResetPasswordConfirm;
