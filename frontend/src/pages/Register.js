import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  // global context and useNavigate later
  const { isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    if (!email || !password || (!isMember && !username)) {
      displayAlert();
      return;
    }
    const currentUser = { username, email, password };
    if (isMember) {
      // loginUser(currentUser)
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login successful!. Redirecting...",
      });
      // registerUser({
      //   currentUser,
      //   endPoint: 'login',
      //   alertText: 'Login Successful! Redirecting...',
      // })
    } else {
      // registerUser(currentUser)
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created!. Redirecting...",
      });
      // registerUser({
      //   currentUser,
      //   endPoint: 'register',
      //   alertText: 'User Created! Redirecting...',
      // })
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
