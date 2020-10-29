import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './stampCatalog.module.scss';
import StampDatePanel from '../StampDatePanel/StampDatePanel';
import StampTable from '../StampTable/StampTable';
import DialogForm from '../DialogForm/DialogForm';
import initialAlert from '../../initialValue/alert';
import AlertAction from '../AlertAction/AlertAction';
import initialFormData from '../../initialValue/formData';
import SearchStamps from '../SearchStamps/SearchStamps';
import CheckAuthTokenQuery from '../../apollo/queries/checkAuthToken';
import { goToAuth } from '../../controllers/redirects';

const CLOSE_DIALOG_AFTER_DELAY = 2000;

const StampCatalog = ({ refetch, stampCatalog, history }) => {
  const checkAuth = CheckAuthTokenQuery();
  const [dialogForm, setDialogForm] = useState({
    open: false,
    formData: initialFormData,
  });
  const [alert, setAlert] = useState(initialAlert);
  const [allStamps, setAllStamps] = useState(stampCatalog);

  useEffect(() => {
    checkAuth.refetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAllStamps(stampCatalog);
  }, [stampCatalog]);

  const updateAllStamps = (stamp) => {
    refetch({ year: stamp });
  };

  const handleClose = () => {
    setDialogForm({ ...dialogForm, open: false });
  };

  const openDialogForm = () => {
    if (!checkAuth.status) {
      setAlert({
        ...alert,
        severity: 'error',
        visible: true,
        message: 'Для того чтобы добавить марку нужно войти в аккаунт',
      });
      setTimeout(() => {
        setAlert({
          ...alert,
          initialAlert,
        });
      }, CLOSE_DIALOG_AFTER_DELAY);
    } else {
      setDialogForm({ ...dialogForm, open: true, formData: initialFormData });
    }
  };

  const changeAlertVisible = () => {
    setAlert({
      ...alert,
      visible: false,
    });
  };

  const searchStamps = (currentSearchStamps) => {
    if (currentSearchStamps === undefined || currentSearchStamps.length === 0) {
      setAlert({
        ...alert,
        severity: 'error',
        visible: true,
        message: 'По вашему запросу ничего не найдено',
      });
      setTimeout(() => {
        setAlert({
          ...alert,
          initialAlert,
        });
      }, CLOSE_DIALOG_AFTER_DELAY);
      setAllStamps(stampCatalog);
    } else {
      setAllStamps(currentSearchStamps);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Хронологический каталог почтовых марок</h1>
      {checkAuth.status ? (
        <SearchStamps
          stampCatalog={stampCatalog}
          searchStamps={searchStamps}
          openDialogForm={openDialogForm}
        />
      ) : null}
      <section className={styles.brands}>
        {allStamps.length > 0 && checkAuth.status ? (
          <div className={styles.brands__date}>
            <StampDatePanel
              openDialogForm={openDialogForm}
              updateAllStamps={updateAllStamps}
            />
          </div>
        ) : null}
        <div className={styles.brands__catalog}>
          {!allStamps.length || !checkAuth.status ? (
            <p
              className={styles.brands__catalog_info}
              onClick={() => goToAuth(history)}
            >
              Войдите в аккаунт для просмотра текущих марок
            </p>
          ) : (
            <StampTable stampCatalog={allStamps} />
          )}
          <DialogForm
            open={dialogForm.open}
            formData={dialogForm.formData}
            handleClose={handleClose}
            buttonText='Добавить'
          />
          <AlertAction
            changeAlertVisible={changeAlertVisible}
            visible={alert.visible}
            severity={alert.severity}
            message={alert.message}
          />
        </div>
      </section>
    </>
  );
};

export default withRouter(StampCatalog);
