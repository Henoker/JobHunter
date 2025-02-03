import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const { passwordReset } = useAuth();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    const response = await passwordReset(email);
    setAlert({
      type: response.success ? "success" : "danger",
      message: response.message,
    });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Reset Password</h3>
        <Alert type={alert.type} text={alert.message} />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
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
