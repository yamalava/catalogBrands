import React, { useState } from 'react';
import AuthForm from '../component/AuthForm/AuthForm';
import { withRouter } from 'react-router-dom';
import initialAlert from '../initialValue/alert';
import AlertAction from '../component/AlertAction/AlertAction';
import RegistrationUserQuery from '../apollo/mutation/registrationUser';

function Registration({ history }) {
  let registrationUserQuery = RegistrationUserQuery();
  const [alert, setAlert] = useState(initialAlert);
  const registrationUser = (dataForm) => {
    registrationUserQuery({
      variables: {
        ...dataForm,
      },
    })
      .then(() => {
        history.push('/auth');
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

  return (
    <>
      <AuthForm
        title='Регистрация'
        btnTitle='Зарегестрироваться'
        formAction={registrationUser}
      />
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

export default withRouter(Registration);
