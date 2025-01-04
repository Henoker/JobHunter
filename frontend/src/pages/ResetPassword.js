import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayAlert, toggleAlert } from "../features/alerts/alertSlice";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { resetPassword } from "../features/auth/authSlice";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: "please provide your email",
        })
      );
      setTimeout(() => dispatch(toggleAlert()), 3000);
      return;
    }

    const userData = {
      email,
    };

    dispatch(resetPassword(userData));
  };

  useEffect(() => {
    if (isError) {
      dispatch(displayAlert({ alertType: "danger", alertText: message }));
      setTimeout(() => dispatch(toggleAlert()), 3000);
    }

    if (isSuccess && user && user.access) {
      dispatch(
        displayAlert({
          alertType: "success",
          alertText: "A reset password email has been sent to you..",
        })
      );
      setTimeout(() => dispatch(toggleAlert()), 3000);

      navigate("/");
    }
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Reset Password</h3>
        <Alert />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          labelText="Email"
        />

        <button type="submit" className="btn btn-block">
          Reset Password
        </button>
      </form>
    </Wrapper>
  );
};

export default ResetPassword;
