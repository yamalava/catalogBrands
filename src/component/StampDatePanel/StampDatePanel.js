import React, { useEffect, useState } from 'react';
import styles from './stampDatePanel.module.scss';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AlertAction from '../AlertAction/AlertAction';
import initialAlert from '../../initialValue/alert';
import GetAllStampsQuery from '../../apollo/queries/getAllStamps';

function StampDatePanel({ updateAllStamps, openDialogForm }) {
  const [brandsDate, setBrandsDate] = useState([]);
  const [alert, setAlert] = useState(initialAlert);
  const [activeYear, setActiveYear] = useState();
  const data = GetAllStampsQuery();

  useEffect(() => {
    if (data.stampCatalog) {
      let brands = data.stampCatalog.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.year === thing.year)
      );
      setBrandsDate(brands.slice().sort((a, b) => a.year - b.year));
    }
  }, [data.stampCatalog]);

  const getBrandsYear = (stampYear) => {
    if (stampYear) {
      updateAllStamps(stampYear);
    } else {
      updateAllStamps();
    }
    setActiveYear(stampYear);
  };

  const handleClickOpen = () => {
    openDialogForm();
  };

  const changeAlertVisible = () => {
    setAlert({
      ...alert,
      visible: false,
    });
  };

  return (
    <div className={styles.date}>
      <ul className={styles.date__lists}>
        <li
          onClick={() => getBrandsYear()}
          className={!activeYear ? styles.active : null}
        >
          Все
        </li>
        {brandsDate.map((brand) => (
          <li
            key={brand.id}
            className={activeYear === brand.year ? styles.active : null}
            onClick={() => getBrandsYear(brand.year)}
          >
            {brand.year}
          </li>
        ))}
      </ul>
      <Fab aria-label='add' onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      {alert.visible && (
        <AlertAction
          changeAlertVisible={changeAlertVisible}
          visible={alert.visible}
          severity={alert.severity}
          message={alert.message}
        />
      )}
    </div>
  );
}

export default StampDatePanel;
