import React, { useEffect, useState } from 'react';
import styles from './stampDatePanel.module.scss';
import GetAllStampsQuery from '../../apollo/queries/getAllStamps';

function StampDatePanel({ updateAllStamps }) {
  const [stampsDate, setStampsDate] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const data = GetAllStampsQuery();

  useEffect(() => {
    if (data.stampCatalog) {
      let stamps = data.stampCatalog.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.year === thing.year)
      );
      setStampsDate(stamps.slice().sort((a, b) => a.year - b.year));
    }
  }, [data.stampCatalog]);

  const getStampsYear = (stampYear) => {
    if (stampYear) {
      updateAllStamps(stampYear);
    } else {
      updateAllStamps();
    }
    setActiveYear(stampYear);
  };

  return (
    <div className={styles.date}>
      <ul className={styles.date__lists}>
        <li
          onClick={() => getStampsYear()}
          className={!activeYear ? styles.active : null}
        >
          Все
        </li>
        {stampsDate.map((stamp) => (
          <li
            key={stamp.id}
            className={activeYear === stamp.year ? styles.active : null}
            onClick={() => getStampsYear(stamp.year)}
          >
            {stamp.year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StampDatePanel;
