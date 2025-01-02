import { useState } from "react";
import { displayAlert } from "../features/alerts/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email || !password) {
      dispatch(displayAlert());
      return;
    }

    const currentUser = { email, password };
    // Call login function here
    // dispatch(login(currentUser));
    console.log("Login submitted", currentUser);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
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
            Register
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
