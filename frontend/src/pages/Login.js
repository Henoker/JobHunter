import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { displayAlert, toggleAlert } from "../features/alerts/alertSlice";
import { login, reset } from "../features/auth/authSlice";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    if (!email || !password) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: "All fields are required",
        })
      );
      setTimeout(() => dispatch(toggleAlert()), 3000);
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
          alertText: "You are successfully logged in as a user.",
        })
      );
      setTimeout(() => dispatch(toggleAlert()), 3000);

      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        <Alert />
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
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Not a member yet?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="member-btn"
          >
            Login
          </button>
          <Link to="/reset-password">Forget Password ?</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
