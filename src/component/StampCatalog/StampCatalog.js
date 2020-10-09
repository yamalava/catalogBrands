import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './stampCatalog.module.scss';
import StampDatePanel from '../StampDatePanel/StampDatePanel';
import StampTable from '../StampTable/StampTable';
import DialogForm from '../DialogForm/DialogForm';
import initialAlert from '../../initialValue/alert';
import checkAuth from '../../controllers/checkAuth';
import AlertAction from '../AlertAction/AlertAction';
import initialFormData from '../../initialValue/formData';
import SearchStamps from '../SearchStamps/SearchStamps';

const CLOSE_DIALOG_AFTER_DELAY = 5000;

function StampCatalog({ refetch, stampCatalog }) {
  const [dialogForm, setDialogForm] = useState({
    open: false,
    formData: initialFormData,
  });
  const [alert, setAlert] = useState(initialAlert);
  const [allStamps, setAllStamps] = useState(stampCatalog);
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
    if (!checkAuth()) {
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
    }
    setDialogForm({ ...dialogForm, open: true, formData: initialFormData });
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
      <SearchStamps
        stampCatalog={stampCatalog}
        searchStamps={searchStamps}
        openDialogForm={openDialogForm}
      />
      <section className={styles.brands}>
        {allStamps.length !== 0 && (
          <div className={styles.brands__date}>
            <StampDatePanel
              openDialogForm={openDialogForm}
              updateAllStamps={updateAllStamps}
            />
          </div>
        )}
        <div className={styles.brands__catalog}>
          {allStamps.length === 0 ? (
            <p className={styles.brands__catalog_info} onClick={openDialogForm}>
              Добавьте марку для отображения ее в списке
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
}

export default withRouter(StampCatalog);
