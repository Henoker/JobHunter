import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, Alert } from "../components";
import React from "react";

const Activation = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  // const { isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      uid,
      token,
    };
    // dispatch(activate(userData));
  };

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(displayAlert({ alertType: "danger", alertText: message }));
  //     setTimeout(() => dispatch(toggleAlert()), 3000);
  //   }

  //   if (isSuccess) {
  //     navigate("/login");
  //     dispatch(
  //       displayAlert({
  //         alertType: "success",
  //         alertText: "Your account has been activated! You can login now",
  //       })
  //     );
  //     setTimeout(() => dispatch(toggleAlert()), 3000);
  //   }

  //   dispatch(reset());
  // }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Activate Account</h3>
        <Alert />

        <button type="submit" className="btn btn-block" disabled>
          Activate Account
        </button>
      </form>
    </Wrapper>
  );
};
export default Activation;
