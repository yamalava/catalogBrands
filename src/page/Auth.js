import React, { useState } from "react";
import { AuthForm } from "../component/AuthForm";
import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../queries";
import { withRouter } from "react-router-dom";
import Loader from "../component/Loader";
import Alert from "../component/AlertAction";

function Auth(props) {
  const [authUserRequest, { loading }] = useMutation(AUTH_USER);
  const [alert, setAlert] = useState({
    severity: "",
    visible: false,
    message: "",
  });
  const authUser = (dataForm) => {
    authUserRequest({
      variables: {
        ...dataForm,
      },
    })
      .then((res) => {
        setAlert({
          ...alert,
          visible: true,
          severity: "success",
          message: `Добро пожаловать ${res.data.authUser.login}`,
        });
        setTimeout(() => {
          sessionStorage.setItem("accessToken", res.data.authUser.token);
          props.history.push("/");
        }, 1500);
      })
      .catch((err) => {
        setAlert({
          ...alert,
          visible: true,
          severity: "error",
          message: err.message,
        });
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthForm title="Авторизация" btnTitle="Войти" getDataForm={authUser} />
      {alert.visible && (
        <Alert severity={alert.severity} message={alert.message} />
      )}
    </>
  );
}

export default withRouter(Auth);
