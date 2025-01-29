import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const { first_name, last_name, email, password, re_password } = formData;

  const navigate = useNavigate();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(displayAlert({ alertType: "danger", alertText: message }));
  //     setTimeout(() => dispatch(toggleAlert()), 3000);
  //   }

  //   if (isSuccess) {
  //     dispatch(
  //       displayAlert({
  //         alertType: "success",
  //         alertText:
  //           "Registration successful! Check your email for activation instructions.",
  //       })
  //     );
  //     setTimeout(() => dispatch(toggleAlert()), 3000);

  //     navigate("/");
  //   }

  //   dispatch(reset());
  // }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Register</h3>
        <Alert />
        <FormRow
          type="text"
          name="first_name"
          value={first_name}
          handleChange={handleChange}
          labelText="First Name"
        />
        <FormRow
          type="text"
          name="last_name"
          value={last_name}
          handleChange={handleChange}
          labelText="Last Name"
        />
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
        <FormRow
          type="password"
          name="re_password"
          value={re_password}
          handleChange={handleChange}
          labelText="Retype Password"
        />
        <button type="submit" className="btn btn-block" disabled>
          Submit
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
