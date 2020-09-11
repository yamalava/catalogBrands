import React, { useState } from 'react';
import AuthForm from '../component/AuthForm/AuthForm';
import { withRouter } from 'react-router-dom';
import Loader from '../component/Loader/Loader';
import AlertAction from '../component/AlertAction/AlertAction';
import initialAlert from '../initialValue/alert';
import AuthUserQuery from '../apollo/mutation/authUser';

function Auth(props) {
  const auth = AuthUserQuery();
  const [alert, setAlert] = useState(initialAlert);
  const authUser = (dataForm) => {
    auth
      .authUserQuery({
        variables: {
          ...dataForm,
        },
      })
      .then((res) => {
        sessionStorage.setItem('accessToken', res.data.authUser.token);
        props.history.push('/');
      })
      .catch((err) => {
        setAlert({
          ...alert,
          visible: true,
          severity: 'error',
          message: err.message,
        });
      });
  };

  const changeAlertVisible = () => {
    setAlert({
      ...alert,
      visible: false,
    });
  };

  return auth.loading ? (
    <Loader />
  ) : (
    <>
      <AuthForm title='Авторизация' btnTitle='Войти' formAction={authUser} />
      {alert.visible && (
        <AlertAction
          severity={alert.severity}
          changeAlertVisible={changeAlertVisible}
          visible={alert.visible}
          message={alert.message}
        />
      )}
    </>
  );
}

export default withRouter(Auth);
