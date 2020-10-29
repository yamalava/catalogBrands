import React from 'react';
import { withRouter } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import styles from './header.module.scss';
import { goToAuth, goToRegistration } from '../../controllers/redirects';
import CheckAuthTokenQuery from '../../apollo/queries/checkAuthToken';
import 'antd/dist/antd.css';
import { Button } from 'antd';

const Header = ({ history }) => {
  const checkAuth = CheckAuthTokenQuery();
  const removeToken = () => {
    sessionStorage.removeItem('accessToken');
    goToAuth(history);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__menu}>
        {checkAuth.status ? (
          <Button variant='contained' onClick={removeToken}>
            Выйти
          </Button>
        ) : (
          <>
            <Button variant='contained' onClick={() => goToAuth(history)}>
              Войти
            </Button>
            <Button
              variant='contained'
              onClick={() => goToRegistration(history)}
            >
              Регистрация
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default withRouter(Header);
